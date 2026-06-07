const express = require("express");

const router = express.Router();

const authenticate = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/role.middleware");

const {
  getAdminDashboard,
  getManagerDashboard,
  getEmployeeDashboard,
} = require("./dashboard.controller");

router.use(authenticate);

router.get(
  "/admin",
  authorize("Admin"),
  getAdminDashboard
);

router.get(
  "/manager",
  authorize("ProjectManager"),
  getManagerDashboard
);

router.get(
  "/employee",
  authorize("Employee"),
  getEmployeeDashboard
);

module.exports = router;