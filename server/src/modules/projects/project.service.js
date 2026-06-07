const Project = require("./project.model");
const User = require("../users/user.model");
const ApiError = require("../../utils/ApiError");
const {
  createAuditLog,
} = require(
  "../auditlogs/auditlog.service"
);

const createProject = async (
  payload,
  currentUser
) => {
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

  await createAuditLog({
    userId:
      currentUser._id,
    action:
      "CREATE",
    entity:
      "Project",
    entityId:
      project._id,
    newValue:
      project.toObject(),
  });

  return project;
};

const getProjects = async ({
  page = 1,
  limit = 10,
  search,
  status,
  managerId,
  currentUser
}) => {
  const filter = {};
  if (
  currentUser.role ===
  "ProjectManager"
  ) {
  filter.managerId =
    currentUser._id;
  }

  if (status) {
    filter.status = status;
  }

  if (
    currentUser.role ===
    "Admin" &&
    managerId
  ) {
    filter.managerId =
      managerId;
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

const getProjectById = async (
  id,
  currentUser
) => {
  const project =
    await Project.findById(id)
      .populate(
        "managerId",
        "name email role"
      );

  if (!project) {
    throw new ApiError(
      404,
      "Project not found"
    );
  }

  if (
    currentUser.role ===
    "ProjectManager"
  ) {
    if (
      project.managerId._id.toString() !==
      currentUser._id.toString()
    ) {
      throw new ApiError(
        403,
        "Access denied"
      );
    }
  }

  return project;
};

const updateProject = async (id, payload, currentUser) => {

  const existingProject = await Project.findById(id);

  if (!existingProject) {
    throw new ApiError(
      404,
      "Project not found"
    );
  }

    if (
  currentUser.role ===
  "ProjectManager"
) {
  if (
    project.managerId.toString() !==
    currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }
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
const oldProject =
  await Project.findById(id);
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
await createAuditLog({
  userId: currentUser._id,
  action: "UPDATE",
  entity: "Project",
  entityId: project._id,
  oldValue: oldProject,
  newValue: project,
});
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
