const logReplyService = require("./logReply.service");
const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/response");

const createReply =
  asyncHandler(
    async (req, res) => {
      const reply =
        await logReplyService.createReply(
          req.params.workLogId,
          req.body,
          req.user
        );

      sendResponse(
        res,
        201,
        "Reply created successfully",
        reply
      );
    }
  );

  const getReplies =
  asyncHandler(
    async (req, res) => {
      const replies =
        await logReplyService.getReplies(
          req.params.workLogId
        );

      sendResponse(
        res,
        200,
        "Replies fetched successfully",
        replies
      );
    }
  );

  const getReplyById =
  asyncHandler(
    async (req, res) => {
      const reply =
        await logReplyService.getReplyById(
          req.params.id
        );

      sendResponse(
        res,
        200,
        "Reply fetched successfully",
        reply
      );
    }
  );

  const updateReply =
  asyncHandler(
    async (req, res) => {
      const reply =
        await logReplyService.updateReply(
          req.params.id,
          req.body,
          req.user
        );

      sendResponse(
        res,
        200,
        "Reply updated successfully",
        reply
      );
    }
  );

  const archiveReply =
  asyncHandler(
    async (req, res) => {
      const reply =
        await logReplyService.archiveReply(
          req.params.id,
          req.user
        );

      sendResponse(
        res,
        200,
        "Reply archived successfully",
        reply
      );
    }
  );

  module.exports = {
  createReply,
  getReplies,
  getReplyById,
  updateReply,
  archiveReply,
};