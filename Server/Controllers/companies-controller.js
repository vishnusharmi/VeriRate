const companiesService = require("../Services/companies-services");


const createCompany = async (req, res) => {
    console.log(req.body,'bodddd');
    console.log('hiiii');
    const data = req.body;
    const files = req.file
    
    try {
        const company = await companiesService.createCompany(data,files);
        res.status(201).json({message: "Company created successfully", company});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
const getAll = async(req,res)=>{
    try {
        const companies = await companiesService.getCompanies();
        res.status(200).json({message: "All companies successfully", });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getById = async(req,res)=>{
    try {
        const company = await companiesService.getcompanyById(req.params.id);
        res.status(200).json({message: "Company found successfully", company});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateCompany = async(req,res)=>{
    try {
        const company = await companiesService.updateCompany(req.params.id, req.body); 
        res.status(200).json({message: "Company updated successfully", data: company});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteCompany = async(req,res)=>{
    try {
        const company = await companiesService.deleteCompany(req.params.id); 
        // if (!company) return res.status(404).json({error:"company not found"})
        res.status(200).json({message: "Company deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

    
module.exports = {
    createCompany,
    getAll,
    getById,
    updateCompany,
    deleteCompany
}
