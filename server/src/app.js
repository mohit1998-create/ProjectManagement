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

app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
module.exports = app;