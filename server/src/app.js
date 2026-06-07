const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

const authRoutes = require(
  "./modules/auth/auth.routes"
);

const userRoutes =
require(
 "./modules/users/user.routes"
);

const projectRoutes = require(
  "./modules/projects/project.routes"
);

const taskRoutes = require(
  "./modules/tasks/task.routes"
);

const workLogRoutes = require(
  "./modules/worklogs/worklog.routes"
);

const logReplyRoutes = require(
  "./modules/worklogs/logReply.routes"
);
 
const dashboardRoutes = require(  
  "./modules/dashboard/dashboard.routes"
);

const reportRoutes = require(
  "./modules/reports/report.routes"
);

const auditLogRoutes = require(
  "./modules/auditlogs/auditlog.routes"
);
const notificationRoutes = require(
    "./modules/notifications/notification.routes"
  );
const path = require("path");

app.use("/api/auditlogs", auditLogRoutes);

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "../uploads"
    )
  )
);
app.use("/api/notifications", notificationRoutes);

app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/worklogs", workLogRoutes);
app.use("/api/replies", logReplyRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
module.exports = app;