const express = require("express");
const loginController = require("../Controllers/loginController");
const { loginLimiter } = require("../utils/loginLimiter");
const verifyToken = require("../MiddleWares/verifyToken");

const loginRouter = express.Router();

loginRouter.post("/login", loginLimiter, loginController.login);
loginRouter.post("/otp", loginLimiter, loginController.otp);
loginRouter.post(
  "/forget-password",
  verifyToken,
  loginController.forgetPassword
);
loginRouter.post("/reset-password", verifyToken, loginController.newPassword);

module.exports = loginRouter;
