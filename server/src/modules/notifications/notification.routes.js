const express =
  require("express");

const router =
  express.Router();

const authenticate =
  require("../../middleware/auth.middleware");

const {
  getNotifications,
  markAsRead,
  markAllRead,
} = require(
  "./notification.controller"
);

router.use(
  authenticate
);

router.get(
  "/",
  getNotifications
);

router.patch(
  "/:id/read",
  markAsRead
);

router.patch(
  "/read-all",
  markAllRead
);

module.exports =
  router;