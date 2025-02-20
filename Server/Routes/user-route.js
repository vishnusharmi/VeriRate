const express = require ('express');
const userControllers = require('../Controllers/user-controller');
const upload = require('../multer/multer');



const userRouter = express.Router();

userRouter.post('/register',upload.single('document'), userControllers.register)

module.exports = userRouter
