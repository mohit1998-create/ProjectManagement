const express =
  require("express");

const router =
  express.Router();

const authenticate =
  require("../../middleware/auth.middleware");

const authorize =
  require("../../middleware/role.middleware");

const validate =
  require("../../middleware/validate.middleware");

 const { getProjectById ,updateProject,archiveProject } = require(
  "./project.controller"
);  
const {createProjectSchema, updateProjectSchema } = require(
  "./project.validation"
); 
  

const {
  createProject,
  getProjects
} = require(
  "./project.controller"
);

router.use(
  authenticate,
  authorize("Admin")
);

router.post(
  "/",
  validate(
    createProjectSchema
  ),
  createProject
);

router.get(
  "/",
  getProjects
);

router.get(
  "/:id",
  getProjectById
);

router.put(
  "/:id",
  validate(updateProjectSchema),
  updateProject
);

router.patch(
  "/:id",
  archiveProject
);
module.exports = router;