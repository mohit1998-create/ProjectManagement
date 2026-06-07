const LogReply = require("./logReply.model");
const WorkLog = require("./worklog.model");
const ApiError = require("../../utils/ApiError");

const createReply = async (
  workLogId,
  payload,
  currentUser
) => {
  const workLog =
    await WorkLog.findById(workLogId)
      .populate({
        path: "taskId",
        populate: {
          path: "projectId",
          select: "managerId",
        },
      });

  if (!workLog) {
    throw new ApiError(
      404,
      "Work log not found"
    );
  }

  if (
    workLog.taskId.projectId.managerId.toString() !==
    currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  return await LogReply.create({
    workLogId,
    managerId: currentUser._id,
    message: payload.message,
  });
};

const getReplies = async (
  workLogId
) => {
  const workLog =
    await WorkLog.findById(workLogId);

  if (!workLog) {
    throw new ApiError(
      404,
      "Work log not found"
    );
  }

  return await LogReply.find({
    workLogId,
    isActive: true,
  })
    .populate(
      "managerId",
      "name email"
    )
    .sort({
      createdAt: 1,
    });
};

const getReplyById = async (
  id
) => {
  const reply =
    await LogReply.findOne({
      _id: id,
      isActive: true,
    })
      .populate(
        "managerId",
        "name email"
      )
      .populate(
        "workLogId"
      );

  if (!reply) {
    throw new ApiError(
      404,
      "Reply not found"
    );
  }

  return reply;
};

const updateReply = async (
  id,
  payload,
  currentUser
) => {
  const reply =
    await LogReply.findOne({
      _id: id,
      isActive: true,
    });

  if (!reply) {
    throw new ApiError(
      404,
      "Reply not found"
    );
  }

  if (
    reply.managerId.toString() !==
    currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  return await LogReply.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
};

const archiveReply = async (
  id,
  currentUser
) => {
  const reply =
    await LogReply.findOne({
      _id: id,
      isActive: true,
    });

  if (!reply) {
    throw new ApiError(
      404,
      "Reply not found"
    );
  }

  if (
    reply.managerId.toString() !==
    currentUser._id.toString()
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  reply.isActive = false;

  await reply.save();

  return reply;
};

module.exports = {
  createReply,
  getReplies,
  getReplyById,
  updateReply,
  archiveReply,
};