const express = require("express");

const router = express.Router();

const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validate.middleware");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  archiveProject,
} = require("./project.controller");

const {
  createProjectSchema,
  updateProjectSchema,
} = require("./project.validation");

router.post(
  "/",
  authenticate,
  authorize("Admin"),
  validate(createProjectSchema),
  createProject
);

router.get(
  "/",
  authenticate,
  authorize(
    "Admin",
    "ProjectManager"
  ),
  getProjects
);

router.get(
  "/:id",
  authenticate,
  authorize(
    "Admin",
    "ProjectManager"
  ),
  getProjectById
);

router.put(
  "/:id",
  authenticate,
  authorize(
    "Admin",
    "ProjectManager"
  ),
  validate(updateProjectSchema),
  updateProject
);

router.patch(
  "/:id/archive",
  authenticate,
  authorize("Admin"),
  archiveProject
);

module.exports = router;