const mongoose = require("mongoose");

const logReplySchema =
  new mongoose.Schema(
    {
      workLogId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "WorkLog",
        required: true,
      },

      managerId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "LogReply",
    logReplySchema
  );