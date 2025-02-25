const express = require("express");
const disputesController = require("../Controllers/disputes-controller");

const disputeRouter = express.Router();


disputeRouter.get("/disputes", disputesController.getDisputes)
.get("/dispute/:id", disputesController.getDisputeById)
.post("/dispute", disputesController.createDispute)
.put("/dispute/:id", disputesController.updateDisputes)
.delete("/dispute/:id", disputesController.deleteDispute);

module.exports = disputeRouter;