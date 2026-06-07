const express = require("express");

const router = express.Router();

const authenticate = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/role.middleware");

const {
  getProjectReport,
  getEmployeeReport,
} = require("./report.controller");

router.use(authenticate);

router.get(
  "/projects/:projectId",
  authorize("Admin", "ProjectManager"),
  getProjectReport
);

router.get(
  "/employees/:employeeId",
  authorize("Admin", "ProjectManager"),
  getEmployeeReport
);

module.exports = router;