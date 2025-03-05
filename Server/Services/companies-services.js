const Company = require("../Models/companies");
const document = require('../Models/documents');
const cloudinaryUpload = require("../MiddleWares/Cloudinary");

exports.createCompany = async (company) => {
    console.log(company,'commmm');
    
    try {
        const companyCreated = Company.create(company);
        if(!companyCreated){
            return {statusCode:404,message:"Error While creating Company"}
        }
          let documentResponse = null;

          if (files && files.path) {
            // Upload document
            const uploadResult = await cloudinaryUpload.uploader.upload(
              files.path,
              {
                resource_type: "auto",
                folder: "user_uploads",
              }
            );

            // Create document entry inside transaction
            documentResponse = await document.create(
              {
                empId: userData.id,
                documentType: files.mimetype,
                file_path: uploadResult.url,
              },
              { transaction }
            );
          }
        return companyCreated;
    } catch (error) {
        console.error("error:",error)
    }
}


//get all compamies
exports.getCompanies = async () => {
    try {
        const companies = await Company.findAll(
         {
            include:[
                {
                    model: document
                }
            ]
         }
               
            
        );
        return companies
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