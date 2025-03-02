const express = require('express');
const loginController = require('../Controllers/loginController');
const loginRouter = express.Router();


loginRouter.post('/login' , loginController.login);
loginRouter.post('/otp', loginController.otp);
loginRouter.post('/forget-password', loginController.forgetPassword);
loginRouter.post('/reset-password', loginController.newPassword);

module.exports = loginRouter