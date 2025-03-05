const { createAuditLog, getAllAuditLogs, getAuditLogsByEntity } = require('../Controllers/audit-controller');

const express = require('express');

const auditRoute = express.Router();

auditRoute.get('/auditlogs', getAllAuditLogs);
auditRoute.get('/auditlogs/:entityType/:entityId', getAuditLogsByEntity);

module.exports = auditRoute;
