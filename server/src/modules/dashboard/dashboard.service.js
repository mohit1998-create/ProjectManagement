const Project = require(
  "../projects/project.model"
);

const Task = require(
  "../tasks/task.model"
);

const User = require(
  "../users/user.model"
);

const WorkLog = require(
  "../worklogs/worklog.model"
);

const getAdminDashboard =
  async () => {
    const totalProjects =
      await Project.countDocuments();

    const activeProjects =
      await Project.countDocuments({
        status: "Active",
      });

    const totalTasks =
      await Task.countDocuments({
        isActive: true,
      });

    const completedTasks =
      await Task.countDocuments({
        status: "Completed",
        isActive: true,
      });

    const overdueTasks =
      await Task.countDocuments({
        deadline: {
          $lt: new Date(),
        },
        status: {
          $ne: "Completed",
        },
        isActive: true,
      });

    const activeEmployees =
      await User.countDocuments({
        role: "Employee",
        isActive: true,
      });

    return {
      totalProjects,
      activeProjects,
      totalTasks,
      completedTasks,
      overdueTasks,
      activeEmployees,
    };
};

const getManagerDashboard =
  async (currentUser) => {

    const projects =
      await Project.find({
        managerId:
          currentUser._id,
      }).select("_id");

    const projectIds =
      projects.map(
        (project) =>
          project._id
      );

    const managedProjects =
      projectIds.length;

    const activeTasks =
      await Task.countDocuments({
        projectId: {
          $in: projectIds,
        },
        status: {
          $ne: "Completed",
        },
        isActive: true,
      });

    const completedTasks =
      await Task.countDocuments({
        projectId: {
          $in: projectIds,
        },
        status: "Completed",
        isActive: true,
      });

    const upcomingDeadlines =
      await Task.countDocuments({
        projectId: {
          $in: projectIds,
        },
        deadline: {
          $gte: new Date(),
          $lte: new Date(
            Date.now() +
              3 *
                24 *
                60 *
                60 *
                1000
          ),
        },
        status: {
          $ne: "Completed",
        },
      });

    const employeeProductivity =
      await WorkLog.aggregate([
        {
          $lookup: {
            from: "tasks",
            localField:
              "taskId",
            foreignField:
              "_id",
            as: "task",
          },
        },
        {
          $unwind:
            "$task",
        },
        {
          $match: {
            "task.projectId":
              {
                $in:
                  projectIds,
              },
          },
        },
        {
          $group: {
            _id:
              "$employeeId",
            totalHours: {
              $sum:
                "$hoursWorked",
            },
          },
        },
      ]);

    return {
      managedProjects,
      activeTasks,
      completedTasks,
      upcomingDeadlines,
      employeeProductivity,
    };
  };

  const getEmployeeDashboard =
  async (currentUser) => {

    const assignedTasks =
      await Task.countDocuments({
        assignedEmployee:
          currentUser._id,
        isActive: true,
      });

    const completedTasks =
      await Task.countDocuments({
        assignedEmployee:
          currentUser._id,
        status: "Completed",
        isActive: true,
      });

    const dueSoonTasks =
      await Task.countDocuments({
        assignedEmployee:
          currentUser._id,
        deadline: {
          $gte: new Date(),
          $lte: new Date(
            Date.now() +
              3 *
                24 *
                60 *
                60 *
                1000
          ),
        },
        status: {
          $ne: "Completed",
        },
      });

    const recentLogs =
      await WorkLog.find({
        employeeId:
          currentUser._id,
      })
        .sort({
          createdAt:
            -1,
        })
        .limit(5);

    return {
      assignedTasks,
      completedTasks,
      dueSoonTasks,
      recentLogs,
    };
  };

module.exports = {  
    getAdminDashboard,
    getManagerDashboard,
    getEmployeeDashboard,
  };