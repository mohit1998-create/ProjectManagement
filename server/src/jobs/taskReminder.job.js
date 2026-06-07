const cron = require("node-cron");

const Task = require(
  "../modules/tasks/task.model"
);

const Notification = require(
  "../modules/notifications/notification.model"
);

const {
  createNotification,
} = require(
  "../modules/notifications/notification.service"
);

const {
  sendReminderEmail,
  sendOverdueEmail,
} = require(
  "../services/email.service"
);

// =========================
// Check Deadlines
// =========================

const checkDeadlines =
  async () => {
    const tasks =
      await Task.find({
        isActive: true,
        status: {
          $nin: [
            "Completed",
            "Archived",
          ],
        },
      })
        .populate(
          "assignedEmployee",
          "name email"
        )
        .populate({
          path: "projectId",
          populate: {
            path: "managerId",
            select:
              "name email",
          },
        });

    const now =
      new Date();

    for (const task of tasks) {
      const deadline =
        new Date(
          task.deadline
        );

      const diffHours =
        (deadline - now) /
        (1000 * 60 * 60);

      if (
        diffHours <= 48 &&
        diffHours > 24
      ) {
        await sendReminder(
          task,
          "48_HOURS"
        );
      }

      if (
        diffHours <= 24 &&
        diffHours > 12
      ) {
        await sendReminder(
          task,
          "24_HOURS"
        );
      }

      if (
        diffHours <= 12 &&
        diffHours > 1
      ) {
        await sendReminder(
          task,
          "12_HOURS"
        );
      }

      if (
        diffHours <= 1 &&
        diffHours > 0
      ) {
        await sendReminder(
          task,
          "1_HOUR"
        );
      }

      if (
        diffHours < 0
      ) {
        await sendReminder(
          task,
          "OVERDUE"
        );
      }
    }
  };

// =========================
// Send Reminder
// =========================

const sendReminder =
  async (
    task,
    reminderType
  ) => {
    const exists =
      await Notification.findOne(
        {
          userId:
            task
              .assignedEmployee
              ._id,

          reminderType,

          message: {
            $regex:
              task.title,
          },
        }
      );

    if (exists) {
      return;
    }

    // Employee Notification

    await createNotification({
      userId:
        task
          .assignedEmployee
          ._id,

      title:
        reminderType ===
        "OVERDUE"
          ? "Task Overdue"
          : "Task Reminder",

      message:
        reminderType ===
        "OVERDUE"
          ? `${task.title} is overdue`
          : `${task.title} is ${reminderType.replaceAll(
              "_",
              " "
            )} from deadline`,

      type:
        reminderType ===
        "OVERDUE"
          ? "OVERDUE"
          : "REMINDER",

      reminderType,
    });

    // Employee Email

    if (
      reminderType ===
      "OVERDUE"
    ) {
      await sendOverdueEmail({
        email:
          task
            .assignedEmployee
            .email,

        taskName:
          task.title,
      });
    } else {
      await sendReminderEmail({
        email:
          task
            .assignedEmployee
            .email,

        taskName:
          task.title,

        reminderType,
      });
    }

    // Manager Notification & Email
    // Only for overdue tasks

    if (
      reminderType ===
        "OVERDUE" &&
      task.projectId
        ?.managerId
    ) {
      await createNotification({
        userId:
          task.projectId
            .managerId._id,

        title:
          "Task Overdue",

        message:
          `${task.title} assigned to employee is overdue`,

        type:
          "OVERDUE",

        reminderType:
          "OVERDUE",
      });

      await sendOverdueEmail({
        email:
          task.projectId
            .managerId.email,

        taskName:
          task.title,
      });
    }
  };

// =========================
// Cron Job
// =========================

cron.schedule(
  "0 * * * *",
  async () => {
    console.log(
      "Running task reminder job..."
    );

    try {
      await checkDeadlines();
    } catch (error) {
      console.error(
        "Task reminder job failed:",
        error
      );
    }
  }
);

module.exports = {
  checkDeadlines,
};