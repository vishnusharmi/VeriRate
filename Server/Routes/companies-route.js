const express = require("express");
const companiesController = require("../Controllers/companies-controller");
const companiesRouter = express.Router();
const upload = require("../Multer/multer");
const verifyToken=require('../MiddleWares/verifyToken')

companiesRouter
  .get("/get-companies", verifyToken, companiesController.getAll)
  .post(
    "/create-company",
    verifyToken,
    // upload.single("document"),
    companiesController.createCompany
  )
  .get("/get-company/:id", verifyToken, companiesController.getById)
  .delete("/delete-company/:id", verifyToken, companiesController.deleteCompany)
  .put("/update-company/:id", verifyToken, companiesController.updateCompany);
 
module.exports = companiesRouter;