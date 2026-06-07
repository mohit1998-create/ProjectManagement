const nodemailer = require("nodemailer");

const transporter =
  nodemailer.createTransport({
    host:
      process.env.EMAIL_HOST,
    port:
      process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user:
        process.env.EMAIL_USER,
      pass:
        process.env.EMAIL_PASS,
    },
  });

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  await transporter.sendMail({
    from:
      `"Project Management System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

const sendTaskAssignedEmail =
  async ({
    email,
    taskName,
  }) => {

    await sendEmail({
      to: email,

      subject:
        "New Task Assigned",

      html: `
        <h2>Task Assigned</h2>
        <p>You have been assigned:</p>
        <b>${taskName}</b>
      `,
    });
  };


  const sendReminderEmail =
  async ({
    email,
    taskName,
    reminderType,
  }) => {

    await sendEmail({
      to: email,

      subject:
        "Task Deadline Reminder",

      html: `
        <h2>Reminder</h2>

        <p>Task:</p>

        <b>${taskName}</b>

        <p>
          Deadline approaching:
          ${reminderType}
        </p>
      `,
    });
  };

  const sendOverdueEmail =
  async ({
    email,
    taskName,
  }) => {

    await sendEmail({
      to: email,

      subject:
        "Task Overdue",

      html: `
        <h2>Task Overdue</h2>

        <p>
          Task
          <b>${taskName}</b>
          has passed its deadline.
        </p>
      `,
    });
  };

module.exports = {
  sendEmail,
  sendTaskAssignedEmail,
  sendReminderEmail,
  sendOverdueEmail,
};