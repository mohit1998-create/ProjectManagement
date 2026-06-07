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

const {
  createReply,
  getReplies,
  getReplyById,
  updateReply,
  archiveReply,
} = require(
  "./logReply.controller"
);

const {
  createReplySchema,
  updateReplySchema,
} = require(
  "./logReply.validation"
);

router.use(authenticate);

router.post(
  "/:workLogId",
  authorize("ProjectManager"),
  validate(createReplySchema),
  createReply
);

router.get(
  "/:workLogId",
  authorize(
    "Admin",
    "ProjectManager",
    "Employee"
  ),
  getReplies
);

router.get(
  "/reply/:id",
  authorize(
    "Admin",
    "ProjectManager",
    "Employee"
  ),
  getReplyById
);

router.put(
  "/reply/:id",
  authorize("ProjectManager"),
  validate(updateReplySchema),
  updateReply
);

router.patch(
  "/reply/:id/archive",
  authorize("ProjectManager"),
  archiveReply
);

module.exports = router;