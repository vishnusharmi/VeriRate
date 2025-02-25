const cloudinaryUpload = require("../MiddleWares/Cloudinary");
const userModel  =require('../Models/user');
const Documents = require("../Models/documents");

const bcrypt=require("bcryptjs");
const { accessSync } = require("fs");
const { error, log } = require("console");






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


// get All users

// exports.getAllusers = async ()=>{
//   try{
//     const getUsers = await userModel.findAll();
//     return getUsers;
//   }
//   catch(error){
//     console.log(error);
    
//   }
// }


exports.getAllusers = async () => {
  try {
    const getUsers = await userModel.findAll({
      include: [
        {
          model: Documents
        },
      ],
      
    });
    return getUsers;
  } catch (error) {
    console.log(error);
  }
};


//get user by id

exports.getUserbyid = async (id)=>{
  try{
    const getuser = await userModel.findByPk(id,{
    include :[
      {
      model : Documents,
      }
    ],

      
  })
  return getuser ;

} catch(error){
  console.error('Error fetching user by id:', error);
  throw error;
  
}
}


//update user by id

exports.updateUserById = async (id ,data, documentPath)=>{

  try{

    const getuser = await userModel.findByPk(id,{
      include :[
        {
        model : Documents,
        }
      ],   
    });

    console.log(getuser.Document.id,'docicici');

    let file_url = getuser.Document.id
    

    const result = await cloudinaryUpload.uploader.upload(documentPath, {
      resource_type: "auto",
      folder: "user_uploads",
    });

    console.log(result,'resultttt');
    
 
    const updatedUser = await userModel.update(data ,{where : {id}});

    if(!updatedUser){
      throw new error (' user not found')
    }

    const docResponse = await Documents.update({file_path:result.url},{where:{id:file_url}});

    console.log(docResponse,'responss');
    

    return updatedUser;
  }catch(error){
    throw error;
  }
};



//delete user

exports.deleteUser = async (id)=>{
  try{
  const deletedUser = await userModel.destroy({where:{id}});

  return deletedUser;
  }
  catch(error){
    console.log(error);
    
  }
}