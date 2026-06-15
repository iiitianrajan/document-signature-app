const Audit =
require("../models/Audit");

const createAudit =
async ({
  documentId,
  userId,
  action,
  ipAddress,
}) => {

  await Audit.create({
    documentId,
    userId,
    action,
    ipAddress,
  });

};

module.exports =
createAudit;