const taskService =
  require("./task.service");

const asyncHandler =
  require("../../utils/asyncHandler");

const sendResponse =
  require("../../utils/response");

const createTask =
  asyncHandler(
    async (req, res) => {
      const task =
        await taskService.createTask(
          req.body,
          req.user
        );

      sendResponse(
        res,
        201,
        "Task created successfully",
        task
      );
    }
  );

const getTasks =
  asyncHandler(
    async (req, res) => {
      const result =
        await taskService.getTasks(
          {
            page:
              Number(
                req.query.page
              ) || 1,

            limit:
              Number(
                req.query.limit
              ) || 10,

            search:
              req.query.search,

            status:
              req.query.status,

            priority:
              req.query.priority,

            assignedEmployee:
              req.query
                .assignedEmployee,

            projectId:
              req.query.projectId,

            currentUser:
              req.user,
          }
        );

      sendResponse(
        res,
        200,
        "Tasks fetched successfully",
        result
      );
    }
  );

const getTaskById =
  asyncHandler(
    async (req, res) => {
      const task =
        await taskService.getTaskById(
          req.params.id,
          req.user
        );

      sendResponse(
        res,
        200,
        "Task fetched successfully",
        task
      );
    }
  );

  const updateTask =
  asyncHandler(
    async (req, res) => {
      const task =
        await taskService.updateTask(
          req.params.id,
          req.body,
          req.user
        );

      sendResponse(
        res,
        200,
        "Task updated successfully",
        task
      );
    }
  );

const updateTaskStatus =
  asyncHandler(
    async (req, res) => {
      const task =
        await taskService.updateTaskStatus(
          req.params.id,
          req.body.status,
          req.user
        );

      sendResponse(
        res,
        200,
        "Task status updated",
        task
      );
    }
  );

const archiveTask =
  asyncHandler(
    async (req, res) => {
      const task =
        await taskService.archiveTask(
          req.params.id,
          req.user
        );

      sendResponse(
        res,
        200,
        "Task archived successfully",
        task
      );
    }
  );

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  archiveTask,
};