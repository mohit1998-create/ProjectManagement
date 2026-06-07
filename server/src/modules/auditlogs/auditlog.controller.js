const auditLogService = require(
  "./auditlog.service"
);

const asyncHandler = require(
  "../../utils/asyncHandler"
);

const sendResponse = require(
  "../../utils/response"
);

const getAuditLogs =
  asyncHandler(
    async (req, res) => {
      const data =
        await auditLogService.getAuditLogs(
          {
            page:
              Number(
                req.query.page
              ) || 1,

            limit:
              Number(
                req.query.limit
              ) || 10,

            action:
              req.query.action,

            entity:
              req.query.entity,
          }
        );

      sendResponse(
        res,
        200,
        "Audit logs fetched successfully",
        data
      );
    }
  );

module.exports = {
  getAuditLogs,
};