const express = require("express");
const userControllers = require("../Controllers/user-controller");
const upload = require("../Multer/multer");
const verifyToken = require("../MiddleWares/verifyToken");

const userRouter = express.Router();

userRouter.post(
  "/register",
  (req, res, next) => {
    console.log("Super Admin");
    console.log(req.body.role);
    if (req.body.role === "Super Admin") {
      
      return next();
    }else{
      verifyToken(req, res, next);
    }
    
  },
  upload.array("document",10),
  userControllers.register
);

// Protected Routes (Require JWT)
userRouter.get("/users",
  //  verifyToken,
    userControllers.getAllUsers);
userRouter.get(
  "/users/:id",
  // verifyToken,
  userControllers.getUserByIdController
);
userRouter.put(
  "/users/:id",
  // verifyToken,
  upload.single("document"),
  userControllers.updateUserById
);
userRouter.delete("/users/:id", verifyToken, userControllers.deleteUserById);

module.exports = userRouter;
