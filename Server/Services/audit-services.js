// // audit-log-services.js
// const AuditLogs = require("../Models/audit-logs");

// // Create Audit Log
// exports.createAuditLog = async (data) => {
//     try {
//         const log = await AuditLogs.create(data);
//         return log;
//     } catch (error) {
//         console.error("Error creating audit log:", error);
//         throw error; // <-- Add this line to propagate the error
//     }
// };

// // Read All Audit Logs
// exports.readAllAuditLogs = async () => {
//     try {
//         const logs = await AuditLogs.findAll();
//         return logs;
//     } catch (error) {
//         console.error("Error fetching audit logs:", error);
//         throw error; // <-- Add this line too
//     }
// };

// // Read Audit Logs by Entity
// exports.readAuditLogsByEntity = async (entityType, entityId) => {
//     try {
//         const logs = await AuditLogs.findAll({ where: { entityType, entityId } });
//         return logs;
//     } catch (error) {
//         console.error("Error fetching audit logs by entity:", error);
//         throw error; // <-- And here
//     }
// };
