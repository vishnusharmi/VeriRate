
const companiesService = require("../Services/companies-services");


const createCompany = async (req, res) => {

    const data = req.body;
    console.log("data",data);
    const createdBy=req.userId;
    console.log("created_by"+createdBy)
    
    try {
        const userData = await companiesService.createCompany(data,createdBy);

        // const action = "UPDATE";
        // const entityType = "Super Admin";
        // const entityId = userData.createdBy || "Not available";
        // // performed by should contain the id of the performer which can be brought by decoding JWT token
        // // here i mentioned userData.id just for now after implementing JWT authentication then change it
        // const performedBy = userData.createdBy;
        // const details = `Company with ID: ${userData.id} Updated succesfully by ${userData.createdBy}`;
        // const ipAddress = req.ip || "0.0.0.0";
        // const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });

        // return res.status(201).json({message: "Company Updated successfully", userData ,auditResponse});
        return res.json({message: "Company Created Successfully",userData})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



const getAll = async(req,res)=>{

    const {page=1,size=5}=req.query;
    const offset = (page - 1) * size;
    try {
        const companies = await companiesService.getCompanies(size,offset,page);
       return res.status(200).json({message: "All companies successfully", companies});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const company = await companiesService.getcompanyById(req.params.id);
        return res.status(200).json({ message: "Company found successfully", data: company });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateCompany = async(req,res)=>{
    console.log(req.userId)
    
    const data={...req.body,createdBy:req.userId};
    console.log(req.body);
    try {
        const company = await companiesService.updateCompany(req.params.id, data );
        // const userData = await companiesService.getcompanyById(req.params.id);

        // const action = "UPDATE";
        // const entityType = "Super Admin";
        // const entityId = req.userId || "Not available";
        // // performed by should contain the id of the performer which can be brought by decoding JWT token
        // // here i mentioned userData.id just for now after implementing JWT authentication then change it
        // const performedBy = req.userId;
        // const details = `Updated company with ID: ${userData.id} by ${userData.createdBy}`;
        // const ipAddress = req.ip || "0.0.0.0";
        // const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });

        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteCompany = async (req, res) => {
    try {
        // const userData = await companiesService.getcompanyById(req.params.id);
       const company = await companiesService.deleteCompany(req.params.id); 
        // // if (!company) return res.status(404).json({error:"company not found"})

        // const action = "DELETE";
        // const entityType = "Super Admin";
        // const entityId = userData.createdBy || "Not available";
        // // performed by should contain the id of the performer which can be brought by decoding JWT token
        // // here i mentioned userData.id just for now after implementing JWT authentication then change it
        // const performedBy = userData.createdBy;
        // const details = `Deleted company with ID: ${userData.id} created by ${userData.createdBy}`;
        // const ipAddress = req.ip || "0.0.0.0";
        // const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });

        return res.status(200).json({message: "Company deleted successfully",company});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createCompany,
    getAll,
    getById,
    updateCompany,
    deleteCompany
}
