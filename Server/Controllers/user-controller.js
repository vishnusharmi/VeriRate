const bcrypt = require ('bcryptjs')
const registerServices = require('../Services/user-service')
require('dotenv').config();



const register = async  (req, res)=>{
  const data = req.body;
  const files = req.file;
console.log(files, "controller");

    try{
         const respose = await registerServices.registerUser (data,files);
        //  console.log(data)
         res.status(201).json(respose)
    }catch(error){
        res.status(500).json({message : error})
    }
    }
module.exports = { register };