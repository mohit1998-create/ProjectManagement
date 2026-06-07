const notificationService =
  require(
    "./notification.service"
  );

const asyncHandler =
  require(
    "../../utils/asyncHandler"
  );

const sendResponse =
  require(
    "../../utils/response"
  );

  const getNotifications =
  asyncHandler(
    async (req, res) => {

      const data =
        await notificationService.getNotifications(
          {
            currentUser:
              req.user,
            page:
              Number(
                req.query.page
              ) || 1,
            limit:
              Number(
                req.query.limit
              ) || 10,
          }
        );

      sendResponse(
        res,
        200,
        "Notifications fetched successfully",
        data
      );
    }
  );

  const markAsRead =
  asyncHandler(
    async (req, res) => {

      const notification =
        await notificationService.markAsRead(
          req.params.id,
          req.user
        );

      sendResponse(
        res,
        200,
        "Notification marked as read",
        notification
      );
    }
  );

  const markAllRead =
  asyncHandler(
    async (req, res) => {

      const result =
        await notificationService.markAllRead(
          req.user
        );

      sendResponse(
        res,
        200,
        result.message
      );
    }
  );

  module.exports = {
  getNotifications,
  markAsRead,
  markAllRead,
};