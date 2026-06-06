const express = require("express");

const router = express.Router();

const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validate.middleware");

const {
  createTask,
  getTasks,
    getTaskById,
    updateTask,
    updateTaskStatus,
    archiveTask,
} = require("./task.controller");

const {
  createTaskSchema,
  updateTaskSchema,
    updateStatusSchema,
} = require("./task.validation");

router.use(authenticate);

router.post(
  "/",
  authorize(
    "Admin",
    "ProjectManager"
  ),
  validate(
    createTaskSchema
  ),
  createTask
);

router.get(
  "/",
  authorize(
    "Admin",
    "ProjectManager",
    "Employee"
  ),
  getTasks
);

router.get(
  "/:id",
  authorize(
    "Admin",
    "ProjectManager",
    "Employee"
  ),
  getTaskById
);

router.put(
  "/:id",
  authorize(
    "Admin",
    "ProjectManager"
  ),
  validate(updateTaskSchema),
  updateTask
);

router.patch(
  "/:id/status",
  authorize(
    "Admin",
    "ProjectManager",
    "Employee"
  ),
  validate(updateStatusSchema),
  updateTaskStatus
);

router.patch(
  "/:id/archive",
  authorize(
    "Admin",
    "ProjectManager"
  ),
  archiveTask
);

module.exports = router;