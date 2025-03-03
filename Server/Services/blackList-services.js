const { AuditLogs } = require("../Models/audit-logs");

// Create Audit Log
exports.createAuditLog = async (data) => {
    try {
        const log = await AuditLogs.create(data);
        return log;
    } catch (error) {
        console.error("Error occurred", error.message);
    }
};

// Read Audit Log by ID
exports.readAuditLog = async (id) => {
    try {
        const log = await AuditLogs.findByPk(id);
        if (!log) {
            return 'Log not available';
        }
        return log;
    } catch (error) {
        console.error("Error occurred", error.message);
    }
};

// Read All Audit Logs
exports.readAllAuditLogs = async () => {
    try {
        const logs = await AuditLogs.findAll({ raw: true });
        return logs;
    } catch (error) {
        console.error("Error occurred", error.message);
    }
};

// Update Audit Log
exports.updateAuditLog = async (id, data) => {
    try {
        const updatedLog = await AuditLogs.update(data, { where: { id } });
        return updatedLog;
    } catch (error) {
        console.error("Error occurred", error.message);
    }
};

// Delete Audit Log
exports.deleteAuditLog = async (id) => {
    try {
        const deletedLog = await AuditLogs.destroy({ where: { id } });
        return deletedLog;
    } catch (error) {
        console.error("Error occurred", error.message);
    }
};
