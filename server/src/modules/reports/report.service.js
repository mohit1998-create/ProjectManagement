const Project = require(
  "../projects/project.model"
);

const Task = require(
  "../tasks/task.model"
);

const WorkLog = require(
  "../worklogs/worklog.model"
);

const User = require(
  "../users/user.model"
);

const ApiError = require(
  "../../utils/ApiError"
);

const getProjectReport = async (
  projectId,
  currentUser
) => {
  const project =
    await Project.findById(
      projectId
    );

  if (!project) {
    throw new ApiError(
      404,
      "Project not found"
    );
  }

  if (
    currentUser.role ===
    "ProjectManager"
  ) {
    if (
      project.managerId.toString() !==
      currentUser._id.toString()
    ) {
      throw new ApiError(
        403,
        "Access denied"
      );
    }
  }

  const totalTasks =
    await Task.countDocuments({
      projectId,
      isActive: true,
    });

  const completedTasks =
    await Task.countDocuments({
      projectId,
      status: "Completed",
      isActive: true,
    });

  const pendingTasks =
    await Task.countDocuments({
      projectId,
      status: {
        $ne: "Completed",
      },
      isActive: true,
    });

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Number(
          (
            (completedTasks /
              totalTasks) *
            100
          ).toFixed(2)
        );

  return {
    projectId:
      project._id,
    projectName:
      project.name,
    totalTasks,
    completedTasks,
    pendingTasks,
    completionPercentage,
  };
};

const getEmployeeReport =
  async (
    employeeId,
    currentUser
  ) => {

    const employee =
      await User.findOne({
        _id: employeeId,
        role: "Employee",
        isActive: true,
      });

    if (!employee) {
      throw new ApiError(
        404,
        "Employee not found"
      );
    }

    if (
      currentUser.role ===
      "ProjectManager"
    ) {
      const managedProjects =
        await Project.find({
          managerId:
            currentUser._id,
        }).select("_id");

      const projectIds =
        managedProjects.map(
          (project) =>
            project._id
        );

      const employeeTask =
        await Task.findOne({
          assignedEmployee:
            employeeId,
          projectId: {
            $in: projectIds,
          },
        });

      if (!employeeTask) {
        throw new ApiError(
          403,
          "Access denied"
        );
      }
    }

    const assignedTasks =
      await Task.countDocuments({
        assignedEmployee:
          employeeId,
        isActive: true,
      });

    const completedTasks =
      await Task.countDocuments({
        assignedEmployee:
          employeeId,
        status: "Completed",
        isActive: true,
      });

    const totalHours =
      await WorkLog.aggregate([
        {
          $match: {
            employeeId:
              employee._id,
          },
        },
        {
          $group: {
            _id: null,
            totalHours: {
              $sum:
                "$hoursWorked",
            },
          },
        },
      ]);

    const totalHoursLogged =
      totalHours[0]
        ?.totalHours || 0;

    const completedTaskDocs =
      await Task.find({
        assignedEmployee:
          employeeId,
        status:
          "Completed",
      });

    let avgCompletionTime =
      0;

    if (
      completedTaskDocs.length
    ) {
      const totalDays =
        completedTaskDocs.reduce(
          (
            sum,
            task
          ) => {
            const days =
              (
                new Date(
                  task.updatedAt
                ) -
                new Date(
                  task.createdAt
                )
              ) /
              (
                1000 *
                60 *
                60 *
                24
              );

            return (
              sum + days
            );
          },
          0
        );

      avgCompletionTime =
        (
          totalDays /
          completedTaskDocs.length
        ).toFixed(2);
    }

    return {
      employeeId:
        employee._id,
      employeeName:
        employee.name,
      assignedTasks,
      completedTasks,
      totalHoursLogged,
      avgCompletionTime:
        `${avgCompletionTime} days`,
    };
  };

  module.exports = {
  getProjectReport,
  getEmployeeReport,
};