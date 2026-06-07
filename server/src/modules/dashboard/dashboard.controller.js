const dashboardService =
  require("./dashboard.service");

const asyncHandler =
  require("../../utils/asyncHandler");

const sendResponse =
  require("../../utils/response");

const getAdminDashboard =
  asyncHandler(
    async (req, res) => {

      const data =
        await dashboardService.getAdminDashboard();

      sendResponse(
        res,
        200,
        "Dashboard fetched successfully",
        data
      );
    }
);

const getManagerDashboard =
  asyncHandler(
    async (req, res) => {

      const data =
        await dashboardService.getManagerDashboard(
          req.user
        );

      sendResponse(
        res,
        200,
        "Dashboard fetched successfully",
        data
      );
    }
);

const getEmployeeDashboard =
  asyncHandler(
    async (req, res) => {

      const data =
        await dashboardService.getEmployeeDashboard(
          req.user
        );

      sendResponse(
        res,
        200,
        "Dashboard fetched successfully",
        data
      );
    }
  );

module.exports = {  
    getAdminDashboard,
    getManagerDashboard,
    getEmployeeDashboard,
};