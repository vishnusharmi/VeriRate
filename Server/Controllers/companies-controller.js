const companiesService = require("../Services/companies-services");
const { createAuditLog } = require("./audit-controller");


const createCompany = async (req, res) => {
    try {
        const userData = await companiesService.createCompany(req.body);

        const action = "UPDATE";
        const entityType = "Super Admin";
        const entityId = userData.createdBy || "Not available";
        // performed by should contain the id of the performer which can be brought by decoding JWT token
        // here i mentioned userData.id just for now after implementing JWT authentication then change it
        const performedBy = userData.createdBy;
        const details = `Company with ID: ${userData.id} Updated succesfully by ${userData.createdBy}`;
        const ipAddress = req.ip || "0.0.0.0";
        const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });

        return res.status(201).json({message: "Company Updated successfully", userData ,auditResponse});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
const getAll = async(req,res)=>{
    try {
        const companies = await companiesService.getCompanies();
        return res.status(200).json({message: "All companies successfully", });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const getById = async(req,res)=>{
    try {
        const company = await companiesService.getcompanyById(req.params.id);
        return res.status(200).json({message: "Company found successfully", company});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const updateCompany = async(req,res)=>{
    try {
        const company = await companiesService.updateCompany(req.params.id, req.body);
        const userData = await companiesService.getcompanyById(req.params.id);

        const action = "UPDATE";
        const entityType = "Super Admin";
        const entityId = userData.createdBy || "Not available";
        // performed by should contain the id of the performer which can be brought by decoding JWT token
        // here i mentioned userData.id just for now after implementing JWT authentication then change it
        const performedBy = userData.createdBy;
        const details = `Updated company with ID: ${userData.id} by ${userData.createdBy}`;
        const ipAddress = req.ip || "0.0.0.0";
        const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });

        return res.status(200).json({message: "Company updated successfully", data: company,auditResponse});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteCompany = async(req,res)=>{
    try {
        const userData = await companiesService.getcompanyById(req.params.id);
        const company = await companiesService.deleteCompany(req.params.id); 
        // if (!company) return res.status(404).json({error:"company not found"})

        const action = "DELETE";
        const entityType = "Super Admin";
        const entityId = userData.createdBy || "Not available";
        // performed by should contain the id of the performer which can be brought by decoding JWT token
        // here i mentioned userData.id just for now after implementing JWT authentication then change it
        const performedBy = userData.createdBy;
        const details = `Deleted company with ID: ${userData.id} created by ${userData.createdBy}`;
        const ipAddress = req.ip || "0.0.0.0";
        const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });

        return res.status(200).json({message: "Company deleted successfully",company,auditResponse});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

    
module.exports = {
    createCompany,
    getAll,
    getById,
    updateCompany,
    deleteCompany
}
