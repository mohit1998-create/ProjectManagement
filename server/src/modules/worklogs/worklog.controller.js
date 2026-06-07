const workLogService =
  require("./worklog.service");

const asyncHandler =
  require("../../utils/asyncHandler");

const sendResponse =
  require("../../utils/response");

const createWorkLog =
  asyncHandler(
    async (req, res) => {

      const workLog =
        await workLogService.createWorkLog(
          {
            ...req.body,
            attachment:
              req.file
                ? req.file.path
                : null,
          },
          req.user
        );

      sendResponse(
        res,
        201,
        "Work log created successfully",
        workLog
      );
    }
  );

const getWorkLogs =
  asyncHandler(
    async (req, res) => {
      const result =
        await workLogService.getWorkLogs(
          {
            ...req.query,
            currentUser:
              req.user,
          }
        );

      sendResponse(
        res,
        200,
        "Work logs fetched successfully",
        result
      );
    }
  );

  const getWorkLogById =
  asyncHandler(
    async (req, res) => {
      const workLog =
        await workLogService.getWorkLogById(
          req.params.id,
          req.user
        );

      sendResponse(
        res,
        200,
        "Work log fetched successfully",
        workLog
      );
    }
  );

 const updateWorkLog =
  asyncHandler(
    async (req, res) => {

      const workLog =
        await workLogService.updateWorkLog(
          req.params.id,
          {
            ...req.body,
            attachment:
              req.file
                ? req.file.path
                : undefined,
          },
          req.user
        );

      sendResponse(
        res,
        200,
        "Work log updated successfully",
        workLog
      );
    }
  );

  const archiveWorkLog =
  asyncHandler(
    async (req, res) => {
      const workLog =
        await workLogService.archiveWorkLog(
          req.params.id,
          req.user
        );

      sendResponse(
        res,
        200,
        "Work log archived successfully",
        workLog
      );
    }
  );

  module.exports = {
  createWorkLog,
  getWorkLogs,
  getWorkLogById,
  updateWorkLog,
  archiveWorkLog,
};