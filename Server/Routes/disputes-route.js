const express = require("express");
const disputesController = require("../Controllers/disputes-controller");
const verifyToken = require("../MiddleWares/verifyToken");

const disputeRouter = express.Router();

disputeRouter
  .get("/disputes", verifyToken, disputesController.getDisputes)
  .get("/dispute/:id", verifyToken, disputesController.getDisputeById)
  .post("/dispute", verifyToken, disputesController.createDispute)
  .put("/dispute/update/:id", verifyToken, disputesController.updateDisputes)
  .delete("/dispute/delete/:id", verifyToken, disputesController.deleteDispute)
  .get(
    "/get-employees-for-disputes",
    verifyToken,
    disputesController.getEmployeesForDisputes
  );

module.exports = disputeRouter;
