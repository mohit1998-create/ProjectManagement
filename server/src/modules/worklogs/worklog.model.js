const mongoose = require("mongoose");

const workLogSchema =
  new mongoose.Schema(
    {
      taskId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
      },

      employeeId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      hoursWorked: {
        type: Number,
        required: true,
        min: 0,
      },

      attachment: {
        type: String,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "WorkLog",
    workLogSchema
  );