const express = require("express");
const userControllers = require("../Controllers/user-controller");
const upload = require("../multer/multer");
const verifyToken = require("../MiddleWares/verifyToken");

const userRouter = express.Router();

// userRouter
//   .post("/register", upload.single("document"), userControllers.register)
//   .get("/users", userControllers.getAllUsers)
//   .get("/users/:id", userControllers.getUserByIdController)
//   .put("/users/:id", upload.single("document"), userControllers.updateUserById)
//   .delete("/users/:id", userControllers.deleteUserById);

userRouter.post(
  "/register",
  upload.single("document"),
  userControllers.register
);

// Protected Routes (Require JWT)
userRouter.get("/users", verifyToken, userControllers.getAllUsers);
userRouter.get(
  "/users/:id",
  verifyToken,
  userControllers.getUserByIdController
);
userRouter.put(
  "/users/:id",
  verifyToken,
  upload.single("document"),
  userControllers.updateUserById
);
userRouter.delete("/users/:id", verifyToken, userControllers.deleteUserById);

module.exports = userRouter;
