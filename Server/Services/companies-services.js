const Company = require("../Models/companies");
const document = require('../Models/documents');

exports.createCompany = async (company) => {
    try {
        const companyCreated = new Company(company);
        if(!companyCreated){
            return {statusCode:404,message:"Error While creating Company"}
        }

        await companyCreated.save();
        return companyCreated;
    } catch (error) {
        console.error("error:",error)
    }
}


//get all compamies
exports.getCompanies = async () => {
    try {
        const companies = await Company.findAll();
        return companies;
    } catch (error) {
        console.error("error:", error)
    }
}



//get single comapny
exports.getcompanyById = async(id) =>{
    try {
        const company = await Company.findByPk(id)
        return company
    } catch (error) {
        console.error("error:", error)
    }
}



//updating company
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




//deleting Company
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