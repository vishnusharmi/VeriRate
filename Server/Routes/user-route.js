const express = require("express");
const userControllers = require("../Controllers/user-controller");
const upload = require("../Multer/multer");
const verifyToken = require("../MiddleWares/verifyToken");
const trackUser = require("../utils/trackUser");
const userRouter = express.Router();

userRouter.post(
  "/register",
  verifyToken,
  upload.array("document", 10),
  userControllers.register,
  trackUser,
);

userRouter.get(
  "/user/employee-admins",
  verifyToken,
  userControllers.getEmployeeAdmins
);

// Protected Routes (Require JWT)
userRouter.get(
  "/users",
  //  verifyToken,
  userControllers.getAllUsers
);
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
