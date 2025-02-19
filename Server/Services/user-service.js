const userModel  =require('../Models/user');

const bcrypt=require("bcryptjs")





// exports.findByEmail= async(email)=>{

//     const emailData= await userModel.findOne({ where : { email}});
//     return emailData
// }


exports.registerUser = async(data)=>{
    const {email,password,role}=data;
   
        const existingUser = await userModel.findOne({where:{email}});
        console.log(existingUser)
   
        if(existingUser){
           return {message:"user alrady exists"}
        }

        const hasshedpassword = await bcrypt.hash(password,10);

        const userData=await userModel.create({email,password:hasshedpassword,role})
        // console.log(userData)
         
        if(userData){
          
          return  {message:'user created successfully',data:userData}
        }
        
   
}