const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user');
const { generateOTP, sendOTPEmail } = require('./otpServices');

exports.validateLogin = async (data) => {
    const { email, password } = data;
    const existingUser = await userModel.findOne({ where: { email } });

    // Check if email exists
    if (!existingUser) {      
        return { statusCode: 404, message: 'Invalid credentials' };
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    // Check if password matches
    if (!isPasswordMatch) {
        return { statusCode: 401, message: 'Invalid password' }; 
    }

    // Generate OTP and store in database
    const { otp } = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    await existingUser.update({ otp, otpExpiresAt });

    try {
        await sendOTPEmail(email, otp);
    } catch (error) {
        return { statusCode: 500, message: "Failed to send OTP. Try again." , error };
    }

    // Generate JWT token with only necessary fields
    const token = jwt.sign(
        { id: existingUser.id, email: existingUser.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );

    return {
        message: "OTP sent to email. Please verify OTP to proceed.",
        jwtToken: token
    };
};


exports.verifyOtp = async (data) => {
    const { email, otp } = data;
    
    try {
        const existingOtpUser = await userModel.findOne({ where: { email } });

        if (!existingOtpUser) {      
            return { statusCode: 404, message: 'User does not exist' };
        }

        // Check OTP validity
        if (existingOtpUser.otp !== otp || new Date() > new Date(existingOtpUser.otpExpiresAt)) {
            return { statusCode: 400, message: "Invalid or expired OTP" };
        }


        
        // Mark user as verified and remove OTP fields
        await existingOtpUser.update({
            isActive: true,
            otp: null,
            otpExpiresAt: null,
        });
        // return  existingOtpUser;
        return { statusCode: 200, message: "OTP Verified successfully" };

    } catch (error) {
        console.error(error);
        return { statusCode: 500, message: "Internal server error" };
    }
};
