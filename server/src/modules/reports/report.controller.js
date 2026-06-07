const reportService = require(
  "./report.service"
);

const asyncHandler = require(
  "../../utils/asyncHandler"
);

const sendResponse = require(
  "../../utils/response"
);

const getProjectReport =
  asyncHandler(
    async (req, res) => {

      const data =
        await reportService.getProjectReport(
          req.params.projectId,
          req.user
        );

      sendResponse(
        res,
        200,
        "Project report fetched successfully",
        data
      );
    }
  );

  const getEmployeeReport =
  asyncHandler(
    async (req, res) => {

      const data =
        await reportService.getEmployeeReport(
          req.params.employeeId,
          req.user
        );

      sendResponse(
        res,
        200,
        "Employee report fetched successfully",
        data
      );
    }
  );

  module.exports = {
  getProjectReport,
  getEmployeeReport,
};