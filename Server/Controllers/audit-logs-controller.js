const aduitLogService=require("../Services/auidit-logs-service")

const createAuditLog=async (req,res)=>{
    
    try {
        const aduitlogData=await aduitLogService.insertAuditLog(req.body)
        res.status(200).json({message:"AuditLog Created Successfully",data:aduitlogData})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getAllAuditLogs=async (req,res)=>{
    try {
        const aduitlogData=await aduitLogService.getAuditLogs()
        res.status(200).json({message:"All AuditLog Details",data:aduitlogData})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const getAuditLogWithId=async (req,res)=>{
    const {id}=req.params
    try {
        const aduitlogData=await aduitLogService.getAuditLogsById(id)
        res.status(200).json({message:"AuditLog Details Successfull",data:aduitlogData})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const updateAuditLog=async (req,res)=>{
    const {id}=req.params;
    const data = req.body
    try {
        const aduitlogData=await aduitLogService.changeAuditLog(data,id)
        res.status(200).json({message:"Updated AduitLogs Successfully",data:aduitlogData})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const deleteAuditLog=async (req,res)=>{
    const {id}=req.params
    try {
        await aduitLogService.destroyAduitLog(id)
        res.status(200).json({message:"AduitLog Deleted Successfully"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
module.exports={createAuditLog,getAllAuditLogs,getAuditLogWithId,updateAuditLog,deleteAuditLog}


