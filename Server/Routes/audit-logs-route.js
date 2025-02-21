const express=require("express")
const auditLogsRouter=express.Router()
const controllerAuditLog=require("../Controllers/audit-logs-controller")


auditLogsRouter.post("/audit-logs/",controllerAuditLog.createAuditLog)
                .get("/audit-logs/",controllerAuditLog.getAllAuditLogs)
                .get("/audit-logs/:id",controllerAuditLog.getAuditLogWithId)
                .put("/audit-logs/:id",controllerAuditLog.updateAuditLog)
                .delete("/audit-logs/:id",controllerAuditLog.deleteAuditLog)

module.exports=auditLogsRouter;