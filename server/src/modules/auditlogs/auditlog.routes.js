const express =
  require("express");

const router =
  express.Router();

const authenticate =
  require("../../middleware/auth.middleware");

const authorize =
  require("../../middleware/role.middleware");

const {
  getAuditLogs,
} = require(
  "./auditlog.controller"
);

router.get(
  "/",
  authenticate,
  authorize("Admin"),
  getAuditLogs
);

module.exports =
  router;