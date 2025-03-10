const companiesService = require("../Services/companies-services");

const createCompany = async (req, res) => {
    const data = req.body;
    const createdBy = req.userId;

    try {
        const userData = await companiesService.createCompany(data, createdBy);
        return res.json({ message: "Company Created Successfully", userData })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



const getAll = async (req, res) => {

    const { page = 1, size = 5 } = req.query;
    const offset = (page - 1) * size;
    try {
        const companies = await companiesService.getCompanies(size, offset, page);
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

    const data = { ...req.body, createdBy: req.userId };
    try {
        const company = await companiesService.updateCompany(req.params.id, data);

        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteCompany = async (req, res) => {
    try {
        await companiesService.deleteCompany(req.params.id,req.userId);
        return res.status(200).json({ message: "Company deleted successfully" });
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
