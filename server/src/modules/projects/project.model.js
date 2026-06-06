const mongoose = require("mongoose");

const projectSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },

      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Planning",
          "Active",
          "Completed",
          "Archived",
        ],
        default: "Planning",
      },

      managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      progress: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );
projectSchema.index({ managerId: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ name: "text" });
module.exports =
  mongoose.model(
    "Project",
    projectSchema
  );