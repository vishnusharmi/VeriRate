// audit-log-controller.js
const auditLogServices = require("../Services/audit-services");

// Create Audit Log
const createAuditLog = async (data) => {
    try {
        // const {action,entityType,entityId,performedBy,details,ipAddress} = data;
        const log = await auditLogServices.createAuditLog(data);
        return {message: `Audit log created successfully`}
    } catch (error) {
        console.error("Error creating audit log:", error);
        return {message: `Error creating audit log: ${error}`};
    }
};

// Get All Audit Logs
const getAllAuditLogs = async (req, res) => {
    try {
        const logs = await auditLogServices.readAllAuditLogs();
        return res.status(200).json({message:"All logs",logs});
    } catch (error) {
        console.error("Error fetching audit logs:", error);
        return res.status(500).json({ error: "Failed to fetch audit logs" });
    }
};

// Get Audit Logs by Entity
const getAuditLogsByEntity = async (req, res) => {
    try {
        const { entityType, entityId } = req.params;
        const logs = await auditLogServices.readAuditLogsByEntity(entityType, entityId);
        res.status(200).json(logs);
    } catch (error) {
        console.error("Error fetching audit logs by entity:", error);
        res.status(500).json({ error: "Failed to fetch audit logs" });
    }
};

module.exports = { createAuditLog, getAllAuditLogs, getAuditLogsByEntity };
