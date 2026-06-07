const mongoose = require("mongoose");

const notificationSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        enum: [
          "TASK_ASSIGNED",
          "REMINDER",
          "OVERDUE",
          "WORKLOG_REPLY",
        ],
        required: true,
      },

      isRead: {
        type: Boolean,
        default: false,
      },
      reminderType: {
  type: String,
  default: null,
}
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Notification",
    notificationSchema
  );