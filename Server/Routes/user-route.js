const express = require ('express');
const userControllers = require('../Controllers/user-controller');
const upload = require('../multer/multer');



const userRouter = express.Router();

userRouter.post('/register',upload.single('document'), userControllers.register)
          .get('/users', userControllers.getAllUsers)
          .get('/users/:id', userControllers.getUserByIdController)
          .put('/users/:id',upload.single('document') ,userControllers.updateUserById)
          .delete('/users/:id',userControllers.deleteUserById);
  module.exports=userRouter;

