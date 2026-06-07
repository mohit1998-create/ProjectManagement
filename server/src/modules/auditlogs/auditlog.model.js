const mongoose = require("mongoose");

const auditLogSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      action: {
        type: String,
        required: true,
      },

      entity: {
        type: String,
        required: true,
      },

      entityId: {
        type:
          mongoose.Schema.Types.ObjectId,
      },

      oldValue: {
        type: Object,
        default: null,
      },

      newValue: {
        type: Object,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "AuditLog",
    auditLogSchema
  );