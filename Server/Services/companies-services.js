const Company = require("../Models/companies");
const document = require('../Models/documents');
const departmentModel = require("../Models/department");
const cloudinaryUpload = require("../MiddleWares/Cloudinary");
const logActivity = require("../Activity/activityFunction.js");

exports.createCompany = async (company) => {
    try {

        const { departments, ...companyData } = company
        const companyCreated = await Company.create(companyData);
        if (!companyCreated) {
            return { statusCode: 404, message: "Error While creating Company" }
        }

        const finalDepartments = departments.map(department => {
            return {
                ...department,
                companyId: companyCreated.id
            }
        })
        const departmentResponse = await departmentModel.bulkCreate(finalDepartments);

        await logActivity(
            companyCreated.id,
            " New company profile created",
            `${companyCreated.companyName}`,
            "Company",
            "Company Management"
        );

        return { companyCreated, departmentResponse };
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
}


//get all compamies
exports.getCompanies = async () => {
    try {
        const companies = await Company.findAll( );
        return companies
    } catch (error) {
        console.error("error:", error)
        throw error;
    }
}



//get single comapny
exports.getcompanyById = async (id) => {
    try {
        const company = await Company.findByPk(id)
        return company
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
}



//updating company
exports.updateCompany = async (id, company) => {
    try {
        let companyUpdate = await Company.findByPk(id);
        if (!company) {
            return res.status(404).json({ error: "company not found " });
        }
        const updateCompany = await Company.update(company, { where: { id } });

        companyUpdate = await Company.findByPk(id);
        await logActivity(
            companyUpdate.id,
            "company profile updated",
            ` ${companyUpdate.companyName}`,
            "Company",
            "Company Management"
        );

        return updateCompany;
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
}




//deleting Company
exports.deleteCompany = async (id) => {
    try {
        const company = await Company.findByPk(id);
        if (!company) {
            return res.status(404).json({ error: "company not found " });
        }
        const deleteCompany = await Company.destroy({ where: { id } });
        await logActivity(
            company.id,
            "company profile deleted",
            ` ${company.companyName}`,
            "Company",
            "Company Management"
        );
        return deleteCompany;
    } catch (error) {
        console.error("error:", error);
    }
};