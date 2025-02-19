const express = require ('express');
const userControllers = require('../Controllers/user-controller')


const userRouter = express.Router();

userRouter.post('/register', userControllers.register)

module.exports = userRouter
