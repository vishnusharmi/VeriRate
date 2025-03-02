const AuditLogs=require("../Models/audit-logs")

const insertAuditLog=async (data)=>{
    try {
        const auditLogData=await AuditLogs.create(data)
        return auditLogData;
    } catch (error) {
        console.log(error.message)
    }
} 

const getAuditLogs=async ()=>{
    try {
        const auditlogData=await AuditLogs.findAll()
        return auditlogData; 
    } catch (error) {
        console.log(error.message)
    }
}

const getAuditLogsById=async(id)=>{
    try {
        const aduitlogData=await AuditLogs.findByPk(id)
        return aduitlogData;
    } catch (error) {
        console.log(error.message)
    }
}

const changeAuditLog=async(data,id)=>{
    try {
        const auditLogData=await AuditLogs.update(data,{where:{id}});
        return auditLogData;
    } catch (error) {
        console.log(error.message)
    }
    
}

const destroyAduitLog=async(id)=>{
   try {
    const auditLogData=await AuditLogs.destroy({where:{id}});
    return auditLogData;
   } catch (error) {
    console.log(error.message)
   }
}


module.exports={insertAuditLog,getAuditLogs,getAuditLogsById,changeAuditLog,destroyAduitLog }
