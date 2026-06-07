const WorkLog =
  require("./worklog.model");

const Task =
  require("../tasks/task.model");

const ApiError =
  require("../../utils/ApiError");

const Project =
  require("../projects/project.model"); 

const {
  createAuditLog,
} = require(
  "../auditlogs/auditlog.service"
);

const createWorkLog = async (
  payload,
  currentUser
) => {
  const task =
    await Task.findById(
      payload.taskId
    );

  if (!task) {
    throw new ApiError(
      404,
      "Task not found"
    );
  }

  if (
    task.assignedEmployee.toString() !==
    currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "You can only log work on assigned tasks"
    );
  }

  const workLog =
    await WorkLog.create({
      taskId:
        payload.taskId,

      employeeId:
        currentUser._id,

      description:
        payload.description,

      hoursWorked:
        payload.hoursWorked,
      attachment:
        payload.attachment,
      });

  await createAuditLog({
    userId:
      currentUser._id,
    action:
      "WORKLOG_SUBMITTED",
    entity:
      "WorkLog",
    entityId:
      workLog._id,
    newValue:
      workLog.toObject(),
  });

  return workLog;
};


const getWorkLogs = async ({
  page = 1,
  limit = 10,
  search,
  employeeId,
  taskId,
  projectId,
  startDate,
  endDate,
  sortBy = "createdAt",
  sortOrder = "desc",
  currentUser,
}) => {
  const filter = {
    isActive: true,
  };

  // Search
  if (search) {
    filter.description = {
      $regex: search,
      $options: "i",
    };
  }

  // Employee Filter
  if (employeeId) {
    filter.employeeId = employeeId;
  }

  // Task Filter
  if (taskId) {
    filter.taskId = taskId;
  }

  // Date Range Filter
  if (startDate || endDate) {
    filter.createdAt = {};

    if (startDate) {
      filter.createdAt.$gte =
        new Date(startDate);
    }

    if (endDate) {
      filter.createdAt.$lte =
        new Date(endDate);
    }
  }

  // Project Filter
  if (projectId) {
    const tasks = await Task.find({
      projectId,
      isActive: true,
    }).select("_id");

    filter.taskId = {
      $in: tasks.map(
        (task) => task._id
      ),
    };
  }

  /*
   * RBAC
   */

  // Employee → own logs only
  if (
    currentUser.role ===
    "Employee"
  ) {
    filter.employeeId =
      currentUser._id;
  }

  // PM → only logs from his projects
  if (
    currentUser.role ===
    "ProjectManager"
  ) {
    const projects =
      await Project.find({
        managerId:
          currentUser._id,
        status: {
          $ne: "Archived",
        },
      }).select("_id");

    const projectIds =
      projects.map(
        (project) =>
          project._id
      );

    const tasks =
      await Task.find({
        projectId: {
          $in: projectIds,
        },
        isActive: true,
      }).select("_id");

    filter.taskId = {
      $in: tasks.map(
        (task) => task._id
      ),
    };
  }

  // Sorting
  const sort = {};

  sort[sortBy] =
    sortOrder === "asc"
      ? 1
      : -1;

  // Pagination
  const skip =
    (page - 1) * limit;

  const logs =
    await WorkLog.find(filter)
      .populate(
        "employeeId",
        "name email role"
      )
      .populate({
        path: "taskId",
        select:
          "title status projectId",
        populate: {
          path: "projectId",
          select:
            "name status",
        },
      })
      .sort(sort)
      .skip(skip)
      .limit(limit);

  const total =
    await WorkLog.countDocuments(
      filter
    );

  return {
    logs,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages:
        Math.ceil(
          total / limit
        ),
    },
  };
};
const getWorkLogById = async (
  id,
  currentUser
) => {
  const workLog =
    await WorkLog.findOne({
      _id: id,
      isActive: true,
    })
      .populate(
        "employeeId",
        "name email role"
      )
      .populate({
        path: "taskId",
        select:
          "title assignedEmployee projectId",
        populate: {
          path: "projectId",
          select:
            "name managerId",
        },
      });

  if (!workLog) {
    throw new ApiError(
      404,
      "Work log not found"
    );
  }

  if (
    currentUser.role ===
    "Employee" &&
    workLog.employeeId._id.toString() !==
      currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  if (
    currentUser.role ===
    "ProjectManager" &&
    workLog.taskId.projectId.managerId.toString() !==
      currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  return workLog;
};

const updateWorkLog = async (
  id,
  payload,
  currentUser
) => {
  const workLog =
    await WorkLog.findOne({
      _id: id,
      isActive: true,
    });

  if (!workLog) {
    throw new ApiError(
      404,
      "Work log not found"
    );
  }

  if (
    currentUser.role ===
    "Employee" &&
    workLog.employeeId.toString() !==
      currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }
if (
  payload.attachment
) {
  workLog.attachment =
    payload.attachment;
}
  const updatedLog =
    await WorkLog.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate(
        "employeeId",
        "name email"
      )
      .populate(
        "taskId",
        "title"
      );

  return updatedLog;
};

const archiveWorkLog = async (
  id,
  currentUser
) => {
  const workLog =
    await WorkLog.findOne({
      _id: id,
      isActive: true,
    });

  if (!workLog) {
    throw new ApiError(
      404,
      "Work log not found"
    );
  }

  if (
    currentUser.role ===
    "Employee" &&
    workLog.employeeId.toString() !==
      currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  workLog.isActive = false;

  await workLog.save();

  return workLog;
};

module.exports = {
  createWorkLog,
  getWorkLogs,
  getWorkLogById,
  updateWorkLog,
  archiveWorkLog,
};  