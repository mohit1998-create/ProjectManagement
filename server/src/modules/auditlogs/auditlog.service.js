const AuditLog = require(
  "./auditlog.model"
);

const createAuditLog = async ({
  userId,
  action,
  entity,
  entityId,
  oldValue = null,
  newValue = null,
}) => {
  return await AuditLog.create({
    userId,
    action,
    entity,
    entityId,
    oldValue,
    newValue,
  });
};

const getAuditLogs = async ({
  page = 1,
  limit = 10,
  action,
  entity,
}) => {
  const filter = {};

  if (action) {
    filter.action = action;
  }

  if (entity) {
    filter.entity = entity;
  }

  const skip =
    (page - 1) * limit;

  const logs =
    await AuditLog.find(filter)
      .populate(
        "userId",
        "name email role"
      )
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

  const total =
    await AuditLog.countDocuments(
      filter
    );

  return {
    logs,
    pagination: {
      total,
      page,
      limit,
      totalPages:
        Math.ceil(
          total / limit
        ),
    },
  };
};

module.exports = {
  createAuditLog,
  getAuditLogs,
};