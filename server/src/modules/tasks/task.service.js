const Task = require("./task.model");
const Project = require("../projects/project.model");
const User = require("../users/user.model");
const ApiError = require("../../utils/ApiError");
const {
  createAuditLog,
} = require(
  "../auditlogs/auditlog.service"
);

const {
  createNotification,
} = require(
  "../notifications/notification.service"
);

const createTask = async (
  payload,
  currentUser
) => {
  const project =
    await Project.findById(
      payload.projectId
    );

  if (!project) {
    throw new ApiError(
      404,
      "Project not found"
    );
  }

  if (
    project.status ===
    "Archived"
  ) {
    throw new ApiError(
      400,
      "Cannot create task in archived project"
    );
  }

  const employee =
    await User.findOne({
      _id:
        payload.assignedEmployee,
      role: "Employee",
      isActive: true,
    });

  if (!employee) {
    throw new ApiError(
      400,
      "Invalid employee"
    );
  }

  if (
    currentUser.role ===
      "ProjectManager" &&
    project.managerId.toString() !==
      currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  payload.createdBy =
    currentUser._id;

  const task =
    await Task.create(payload);

  await createAuditLog({
    userId:
      currentUser._id,
    action:
      "CREATE",
    entity:
      "Task",
    entityId:
      task._id,
    newValue:
      task.toObject(),
  });
  await createNotification({
  userId:
    employee._id,

  title:
    "New Task Assigned",

  message:
    `You have been assigned task: ${task.title}`,

  type:
    "TASK_ASSIGNED",
});

  return task;
};

const getTasks = async ({
  page = 1,
  limit = 10,
  search,
  status,
  priority,
  assignedEmployee,
  projectId,
  currentUser,
}) => {
  const filter = {
    isActive: true,
  };

  if (search) {
    filter.$or = [
      {
        title: {
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

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assignedEmployee)
    filter.assignedEmployee = assignedEmployee;

  if (projectId) {
    filter.projectId = projectId;
  }

  // Employee visibility
  if (currentUser.role === "Employee") {
    filter.assignedEmployee = currentUser._id;
  }

  // PM visibility
  if (currentUser.role === "ProjectManager") {
    const projects = await Project.find({
      managerId: currentUser._id,
    }).select("_id");

    const projectIds = projects.map(
      (project) => project._id
    );

    filter.projectId = {
      $in: projectIds,
    };
  }

  const skip = (page - 1) * limit;

  const tasks = await Task.find(filter)
    .populate(
      "assignedEmployee",
      "name email role"
    )
    .populate(
      "projectId",
      "name status"
    )
    .populate(
      "createdBy",
      "name email role"
    )
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total =
    await Task.countDocuments(filter);

  return {
    tasks,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit
      ),
    },
  };
};

const getTaskById = async (
  id,
  currentUser
) => {
  const task = await Task.findOne({
    _id: id,
    isActive: true,
  })
    .populate(
      "assignedEmployee",
      "name email role"
    )
    .populate(
      "projectId",
      "name managerId status"
    )
    .populate(
      "createdBy",
      "name email role"
    );

  if (!task) {
    throw new ApiError(
      404,
      "Task not found"
    );
  }

  if (
    currentUser.role === "ProjectManager" &&
    task.projectId.managerId.toString() !==
      currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  if (
    currentUser.role === "Employee" &&
    task.assignedEmployee._id.toString() !==
      currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  return task;
};

const updateTask = async (
  id,
  payload,
  currentUser
) => {
  const task = await Task.findOne({
    _id: id,
    isActive: true,
  });

  if (!task) {
    throw new ApiError(
      404,
      "Task not found"
    );
  }

  const project =
    await Project.findById(
      task.projectId
    );

  if (
    currentUser.role === "ProjectManager" &&
    project.managerId.toString() !==
      currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  if (payload.assignedEmployee) {
    const employee =
      await User.findOne({
        _id:
          payload.assignedEmployee,
        role: "Employee",
        isActive: true,
      });

    if (!employee) {
      throw new ApiError(
        400,
        "Invalid employee"
      );
    }
  }

  return await Task.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate(
      "assignedEmployee",
      "name email role"
    )
    .populate(
      "projectId",
      "name status"
    );
};

const updateTaskStatus = async (
  id,
  status,
  currentUser
) => {
  const task = await Task.findOne({
    _id: id,
    isActive: true,
  }).populate(
    "projectId",
    "managerId"
  );

  if (!task) {
    throw new ApiError(
      404,
      "Task not found"
    );
  }

  if (
    currentUser.role === "Employee" &&
    task.assignedEmployee.toString() !==
      currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  if (
    currentUser.role === "ProjectManager" &&
    task.projectId.managerId.toString() !==
      currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  task.status = status;

  await task.save();
  await createAuditLog({
  userId: currentUser._id,
  action: "STATUS_CHANGE",
  entity: "Task",
  entityId: task._id,
  oldValue: {
    status:
      previousStatus,
  },
  newValue: {
    status:
      task.status,
  },
});
  return await Task.findById(id)
    .populate(
      "assignedEmployee",
      "name email role"
    )
    .populate(
      "projectId",
      "name status"
    );
};

const archiveTask = async (
  id,
  currentUser
) => {
  const task = await Task.findOne({
    _id: id,
    isActive: true,
  }).populate(
    "projectId",
    "managerId"
  );

  if (!task) {
    throw new ApiError(
      404,
      "Task not found"
    );
  }

  if (
    currentUser.role === "ProjectManager" &&
    task.projectId.managerId.toString() !==
      currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  task.isActive = false;

  await task.save();

  return task;
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  archiveTask,
};