const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Critical",
      ],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "To Do",
        "In Progress",
        "In Review",
        "Completed",
        "Blocked",
      ],
      default: "To Do",
    },

    deadline: {
      type: Date,
      required: true,
    },

    estimatedHours: {
      type: Number,
      default: 0,
    },

    assignedEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
      isActive: {
  type: Boolean,
  default: true,
},
  },
  {
    timestamps: true,
  },

);



taskSchema.index({ projectId: 1 });
taskSchema.index({ assignedEmployee: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ deadline: 1 });

module.exports = mongoose.model(
  "Task",
  taskSchema
);