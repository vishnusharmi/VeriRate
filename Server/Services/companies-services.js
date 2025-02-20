const Company = require("../Models/companies")

exports.createCompany = async (company) => {
    try {
        const companyCreated = await Company.create(company)
        return companyCreated
    } catch (error) {
        console.error("error:",error)
    }
}
exports.getCompanies = async () => {
    try {
        const companies = await Company.findAll()
        return companies
    } catch (error) {
        console.error("error:", error)
    }
}

exports.getcompanyById = async(id) =>{
    try {
        const company = await Company.findByPk(id)
        return company
    } catch (error) {
        console.error("error:", error)
    }
}

exports.updateCompany = async (id, company) =>{
    try {
        // const companyUpdate = await Company.findByPk(id);
        // if(!company){
        //     return res.status(404).json({error: "company not found "})
        // }
        const updateCompany = await Company.update(company,{where: {id}});
        return updateCompany;
    } catch (error) {
        console.error("error:", error)
    }
}

exports.deleteCompany = async(id) =>{
    try {
        // const company = await Company.findByPk(id);
        // if(!company){
        //     return res.status(404).json({error: "company not found "})
        // }
        const deleteCompany = await Company.destroy({ where: { id } });
        return deleteCompany
    } catch (error) {
        console.error("error:", error)
    }
}