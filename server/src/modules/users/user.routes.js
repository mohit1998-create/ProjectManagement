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

const { getUserById ,updateUser,deactivateUser } = require(
  "./user.controller"
);  
const { updateUserSchema } = require(
  "./user.validation"
);

const {
  createUserSchema
} = require(
  "./user.validation"
);

const {
  createUser,
  getUsers
} = require(
  "./user.controller"
);

router.use(
  authenticate,
  authorize("Admin")
);

router.post(
  "/",
  validate(
    createUserSchema
  ),
  createUser
);

router.get(
  "/",
  getUsers
);

router.get(
  "/:id",
  getUserById
);

router.put(
  "/:id",
  validate(updateUserSchema),
  updateUser
);

router.delete(
  "/:id",
  deactivateUser
);

module.exports = router;