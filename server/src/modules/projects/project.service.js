const Project = require("./project.model");
const User = require("../users/user.model");
const ApiError = require("../../utils/ApiError");

const createProject = async (payload) => {
const manager =
  await User.findOne({
    _id: payload.managerId,
    role: "ProjectManager",
    isActive: true,
  });

if (!manager) {
  throw new ApiError(
    400,
    "Invalid Project Manager"
  );
}
  const project =
    await Project.create(payload);

  return project;
};

const getProjects = async ({
  page = 1,
  limit = 10,
  search,
  status,
  managerId,
}) => {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (managerId) {
    filter.managerId = managerId;
  }

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const projects = await Project.find(filter)
    .populate("managerId", "name email role")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  const total = await Project.countDocuments(filter);

  return {
    projects,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getProjectById = async (id) => {
  const project =
    await Project.findById(id).populate(
      "managerId",
      "name email role"
    );

  if (!project) {
    throw new ApiError(
      404,
      "Project not found"
    );
  }

  return project;
};  

const updateProject = async (id, payload) => {
  const existingProject = await Project.findById(id);

  if (!existingProject) {
    throw new ApiError(
      404,
      "Project not found"
    );
  }

  if (existingProject.status === "Archived") {
    throw new ApiError(
      400,
      "Archived project cannot be updated"
    );
  }

  if (payload.managerId) {
    const manager = await User.findOne({
      _id: payload.managerId,
      role: "ProjectManager",
      isActive: true,
    });

    if (!manager) {
      throw new ApiError(
        400,
        "Invalid Project Manager"
      );
    }
  }

  const project =
    await Project.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "managerId",
      "name email role"
    );

  return project;
};

const archiveProject = async (id) => {
  const project =
    await Project.findById(id);

  if (!project) {
    throw new ApiError(
      404,
      "Project not found"
    );
  }

  if (project.status === "Archived") {
    throw new ApiError(
      400,
      "Project already archived"
    );
  }

  project.status = "Archived";

  await project.save();

  return await Project.findById(id)
    .populate(
      "managerId",
      "name email role"
    );
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  archiveProject
};  
