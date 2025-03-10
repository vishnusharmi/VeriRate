const express = require("express");
const companiesController = require("../Controllers/companies-controller");
const companiesRouter = express.Router();
const upload = require("../Multer/multer");
const verifyToken = require("../MiddleWares/verifyToken");

companiesRouter
  .get("/get-companies", companiesController.getAll)
  .post(
    "/create-company",
    upload.single("document"),verifyToken,
    companiesController.createCompany
  )
  .get("/get-company/:id", companiesController.getById)
  .delete("/delete-company/:id", companiesController.deleteCompany)
  .put("/update-company/:id", companiesController.updateCompany);
 
module.exports = companiesRouter;