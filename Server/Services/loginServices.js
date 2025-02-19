// const { Model } = require("sequelize");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

const userModel = Model

exports.validateLogin = async (data) => {
        const {email , password} = data
   
        const existingUser = await userModel.findOne({where:{email}});

        //check eamil exist or not
        if(!existingUser){
            
            return {statusCode : 404, message :'inavlid credentials'}

        }


        const isPasswordMatch = await bcrypt.compare(password , existingUser.password);
        //check password is match or not
        if(!isPasswordMatch){
          return {statusCode:500,message:'invalid password'}
        };


        // const token = 




      
    }