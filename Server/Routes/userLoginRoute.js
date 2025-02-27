const express = require('express');
const loginController = require('../Controllers/loginController');
const loginRouter = express.Router();


loginRouter.post('/login' , loginController.login);
loginRouter.post('/otp', loginController.otp);

module.exports = loginRouter