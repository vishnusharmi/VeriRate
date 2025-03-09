const Company = require("../Models/companies");
const document = require('../Models/documents');
const departmentModel = require("../Models/department");
const cloudinaryUpload = require("../MiddleWares/Cloudinary");
const sequelize=require('../Config/DBconnection')
const Department=require('../Models/department');

exports.createCompany = async (company,createdBy) => {
    try {
        const {departments,...companyData} = company
        const companyCreated = await Company.create({...companyData,createdBy});
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
exports.getCompanies = async (limit,offset,page) => {
    try {
        const result = await Company.findAndCountAll({
            limit: parseInt(limit), // Number of records per page
            offset: parseInt(offset), // Skip records for pagination
            include: [
                {
                    model: Department,
                   
                }
            ],
            distinct: true, // Fixes incorrect count issue
            order: [["createdAt", "DESC"]] // Sorting by latest created
        });
        return {
            totalRecords: result.count, // Total records count
            page: parseInt(page),
            totalPages: Math.ceil(result.count / limit),
            companies: result.rows, // Fetched company records with departments
        }
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
    const t = await sequelize.transaction(); 
console.log(id);
    const {companyName,
        email,
        phonenumber,
        address,
        industry,
        country,
        state,
        registerNum,
        founderYear,
        companyWebsite,
        departments} = company


    try {
       
 // **Update company table**
const companyUpdatedData= await Company.update(
    {
        companyName,
        email,
        phonenumber,
        address,
        industry,
        country,
        state,
        registerNum,
        founderYear,
        companyWebsite
    },
    { where: { id },transaction:t }
);

if(companyUpdatedData){

    // here after updating companies updating departments
    for (const dept of departments) {
        const deptData=await Department.upsert(
            {
                id: dept.id,  // If ID exists, it updates; otherwise, inserts
                name: dept.name,
                departmentCode: dept.departmentCode,
                companyId:id
            
            },
            { transaction: t }
        );
    }
}
await t.commit(); // Commit transaction
return { message: 'Company and departments updated successfully' }
    } catch (error) {
        await t.rollback(); // Rollback transaction if error occurs
        throw new Error(`Failed to update company and departments: ${error.message}`);
    }
}




//deleting Company
exports.deleteCompany = async (id) => {
    try {
        const company = await Company.findByPk(id);
        if(!company){
            return res.status(404).json({error: "company not found "})
        }
        const deleteCompany = await Company.destroy({ where: { id } });
        return deleteCompany
    } catch (error) {
        console.error("error:", error)
    }
}