const {createBlackListUser ,readBlackListUser,readAllBlackListUser ,updateBlackListUser , deleteBlackListUser} = require ('../Controllers/blackList-controller')

const express = require("express");
const verifyToken = require('../MiddleWares/verifyToken');

const blackListRoute = express.Router()

// api/blacklists
blackListRoute.post("/blacklist/create",verifyToken, createBlackListUser)
blackListRoute.get("/blacklist/:id",verifyToken, readBlackListUser)
blackListRoute.get("/blacklists",verifyToken, readAllBlackListUser)
blackListRoute.put("/blacklist/update/:id",verifyToken, updateBlackListUser)
blackListRoute.delete("/blacklist/delete/:id",verifyToken, deleteBlackListUser)


module.exports = blackListRoute