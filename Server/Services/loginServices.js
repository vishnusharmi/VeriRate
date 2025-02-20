const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');
const { generateOTP, sendOTPEmail } = require('./otpServices');

exports.validateLogin = async (data) => {
        const {email , password} = data
   
        const existingUser = await userModel.findOne({where:{email}})

        //check eamil exist or not
        if(!existingUser){      
            return {statusCode : 404, message :'inavlid credentials'}
        }

        const isPasswordMatch = await bcrypt.compare(password , existingUser.password);

        //check password is match or not
        if(!isPasswordMatch){
          return {statusCode:500,message:'invalid password'}
        };



        // Generate OTP and store in database
        const {otp , otpExpiresAt} = generateOTP();

        await existingUser.update({otp , otpExpiresAt});
        await sendOTPEmail(email,otp);

        const token = jwt.sign({existingUser} , process.env.JWT_SECRET ,{
            expiresIn:'1d'
        });
        
        

        return {
            jwtToken:token,
            message: "OTP sent to email. Please verify OTP to proceed."
        }

      
    }
