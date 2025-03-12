const express = require("express");
const TotalEmployers  = require("../Controllers/adminController");
const verifyToken = require("../MiddleWares/verifyToken");
const admindashboardRouter = express.Router();

// Route to get the total number of employers
admindashboardRouter.get("/total-employers", verifyToken,TotalEmployers.getTotalEmployers);

module.exports = admindashboardRouter;
