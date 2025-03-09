const {createBlackListUser ,readBlackListUser,readAllBlackListUser ,updateBlackListUser , deleteBlackListUser} = require ('../Controllers/blackList-controller')

const express = require("express");
const verifyToken = require('../MiddleWares/verifyToken');

const blackListRoute = express.Router()

// api/blacklists
blackListRoute.post("/blacklists",verifyToken, createBlackListUser)
blackListRoute.get("/blacklists/:id",verifyToken, readBlackListUser)
blackListRoute.get("/blacklists",verifyToken, readAllBlackListUser)
blackListRoute.put("/blacklists/:id",verifyToken, updateBlackListUser)
blackListRoute.delete("/blacklists/:id",verifyToken, deleteBlackListUser)


module.exports = blackListRoute