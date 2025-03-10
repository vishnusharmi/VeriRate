const Company = require("../Models/companies");
const document = require('../Models/documents');
const departmentModel = require("../Models/department");
const cloudinaryUpload = require("../MiddleWares/Cloudinary");
const Employee = require('../Models/EmployeeModel')

exports.createCompany = async (company) => {
    try {

        const {departments,...companyData} = company
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

        return {companyCreated, departmentResponse};
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
}


//get all compamies
exports.getCompanies = async (page = 1, pageSize = 10) => {
    try {
        const { count, rows } = await Company.findAndCountAll({
            include: [{ model: Employee }],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });


        return {
            totalRecords: count, // Total number of records
            totalPages: Math.ceil(count / pageSize), // Total pages
            currentPage: page,
            pageSize: pageSize,
            data: rows, // Current page data
          }
    } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
    }
};



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
        // const companyUpdate = await Company.findByPk(id);
        // if(!company){
        //     return res.status(404).json({error: "company not found "})
        // }
        const updateCompany = await Company.update(company, { where: { id } });
        return updateCompany;
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
}




//deleting Company
exports.deleteCompany = async (id) => {
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