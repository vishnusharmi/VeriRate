const express = require("express");
const loginController = require("../Controllers/loginController");
const { loginLimiter } = require("../utils/loginLimiter");
const verifyToken = require("../MiddleWares/verifyToken");

const loginRouter = express.Router();

loginRouter.post("/login", loginLimiter, loginController.login);
loginRouter.post("/otp", verifyToken, loginLimiter, loginController.otp);

module.exports = loginRouter;
