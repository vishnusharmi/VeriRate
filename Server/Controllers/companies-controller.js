const companiesService = require("../Services/companies-services");


const createCompany = async (req, res) => {

    const data = req.body;
    const adminId = req.userId;

    try {
        const userData = await companiesService.createCompany({...data,adminId});
        return res.json({ message: "Company Updated successfully", userData });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAll = async (req, res) => {
    try {
        const companies = await companiesService.getCompanies();
        return res.status(200).json({ message: "All companies successfully", companies });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const company = await companiesService.getcompanyById(req.params.id);
        return res.status(200).json({ message: "Company found successfully", data: company });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateCompany = async (req, res) => {
    try {
        const company = await companiesService.updateCompany(req.params.id, req.body);
        return res.status(200).json({ message: "Company updated successfully", data: company });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteCompany = async (req, res) => {
    try {
        const company = await companiesService.deleteCompany(req.params.id);
        return res.status(200).json({ message: "Company deleted successfully", company});
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
