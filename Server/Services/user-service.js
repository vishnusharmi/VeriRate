const cloudinaryUpload = require("../MiddleWares/Cloudinary");
const userModel  =require('../Models/user');
const Documents = require("../Models/documents");

const bcrypt=require("bcryptjs")





// exports.findByEmail= async(email)=>{

//     const emailData= await userModel.findOne({ where : { email}});
//     return emailData
// }


exports.registerUser = async(data,files)=>{
    const {email,password,role}=data;
   console.log(data,'emememem');
   
   try {
        const existingUser = await userModel.findOne({ where: { email } });
        console.log(existingUser);

        if (existingUser) {
          return { message: "user alrady exists" };
        }

        const hasshedpassword = await bcrypt.hash(password, 10);

        const userData = await userModel.create({
          email,
          password: hasshedpassword,
          role,
        });
        // console.log(userData)

        const result = await cloudinaryUpload.uploader.upload(files.path, {
          resource_type: "auto",
          folder: "user_uploads",
        });

        const obj = {
          empId: userData.id,
          documentType: files.mimetype,
          file_path: result.url,
        };

        console.log(result, "resul");
        console.log(obj, "obobob");
        if (userData) {
          const response = await Documents.create(obj);
          return {
            message: "user created successfully",
            data: { userData, response },
          };
        }
   } catch (error) {
    console.log(error)
   }
    
        
   
}