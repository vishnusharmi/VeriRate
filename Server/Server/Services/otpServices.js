// const { text } = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Avoid SSL error
    minVersion: "TLSv1.2" // Ensures compatibility
  }
});

// Function to generate a 6-digit OTP

const generateOTP = () =>{
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  const otp=Math.floor(100000 + Math.random() * 900000).toString();
  return {otp,otpExpiresAt}

} 


// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Account Verification',
    text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { generateOTP, sendOTPEmail };
