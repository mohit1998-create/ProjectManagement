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

const upload = require(
  "../../middleware/upload.middleware"
);  

const {
  createWorkLog,
  getWorkLogs,
  getWorkLogById,
  updateWorkLog,
  archiveWorkLog,
} = require(
  "./worklog.controller"
);

const {
  createWorkLogSchema,
  updateWorkLogSchema,
} = require(
  "./worklog.validation"
);

router.use(authenticate);

router.post(
  "/",
  authorize("Employee"),
  validate(
    createWorkLogSchema
  ),
  createWorkLog
);

router.get(
  "/",
  authorize(
    "Admin",
    "ProjectManager",
    "Employee"
  ),
  getWorkLogs
);

router.get(
  "/:id",
  authorize(
    "Admin",
    "ProjectManager",
    "Employee"
  ),
  getWorkLogById
);

router.put(
  "/:id",
  authorize(
    "Admin",
    "Employee"
  ),
  validate(
    updateWorkLogSchema
  ),
  updateWorkLog
);

router.patch(
  "/:id/archive",
  authorize(
    "Admin",
    "Employee"
  ),
  archiveWorkLog
);

router.post(
  "/",
  upload.single(
    "attachment"
  ),
  validate(
    createWorkLogSchema
  ),
  createWorkLog
);

router.put(
  "/:id",
  upload.single(
    "attachment"
  ),
  validate(
    updateWorkLogSchema
  ),
  updateWorkLog
);

module.exports = router;