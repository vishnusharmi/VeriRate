const bcrypt = require ('bcryptjs')
const registerServices = require('../Services/user-service')
require('dotenv').config();



exports.register = async  (req, res)=>{
  
  
    try{
         const data = await registerServices.registerUser (req.body);
        //  console.log(data)
         res.status(201).json(data)
    }catch(error){
        res.status(500).json({message : error.message})
    }
    }
