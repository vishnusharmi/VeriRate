// audit-log-controller.js
const auditLogServices = require("../Services/audit-services");

// Create Audit Log
const createAuditLog = async (req, res) => {
    try {
        const log = await auditLogServices.createAuditLog(req.body);
        res.status(200).json({ message: "Audit log created successfully", log });
    } catch (error) {
        console.error("Error creating audit log:", error);
        res.status(500).json({ error: "Failed to create audit log" });
    }
};

// Get All Audit Logs
const getAllAuditLogs = async (req, res) => {
    try {
        const logs = await auditLogServices.readAllAuditLogs();
        res.status(200).json(logs);
    } catch (error) {
        console.error("Error fetching audit logs:", error);
        res.status(500).json({ error: "Failed to fetch audit logs" });
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
