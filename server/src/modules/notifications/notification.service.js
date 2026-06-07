const Notification = require(
  "./notification.model"
);

const ApiError = require(
  "../../utils/ApiError"
);

const createNotification =
  async ({
    userId,
    title,
    message,
    type,
  }) => {
    return await Notification.create({
      userId,
      title,
      message,
      type,
    });
  };

  const getNotifications =
  async ({
    currentUser,
    page = 1,
    limit = 10,
  }) => {

    const skip =
      (page - 1) * limit;

    const notifications =
      await Notification.find({
        userId:
          currentUser._id,
      })
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    const total =
      await Notification.countDocuments(
        {
          userId:
            currentUser._id,
        }
      );

    return {
      notifications,
      pagination: {
        total,
        page,
        limit,
        totalPages:
          Math.ceil(
            total / limit
          ),
      },
    };
  };

  const markAsRead =
  async (
    id,
    currentUser
  ) => {

    const notification =
      await Notification.findOne({
        _id: id,
        userId:
          currentUser._id,
      });

    if (!notification) {
      throw new ApiError(
        404,
        "Notification not found"
      );
    }

    notification.isRead =
      true;

    await notification.save();

    return notification;
  };

  const markAllRead =
  async (
    currentUser
  ) => {

    await Notification.updateMany(
      {
        userId:
          currentUser._id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    return {
      message:
        "All notifications marked as read",
    };
  };

  module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  markAllRead,
};