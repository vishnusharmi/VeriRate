const {createBlackListUser ,readBlackListUser,readAllBlackListUser ,updateBlackListUser , deleteBlackListUser} = require ('../Controllers/blackList-controller')

const express = require("express");

const blackListRoute = express.Router()

blackListRoute.post("/blacklists", createBlackListUser)
blackListRoute.get("/blacklists/:id", readBlackListUser)
blackListRoute.get("/blacklists", readAllBlackListUser)
blackListRoute.put("/blacklists/:id", updateBlackListUser)
blackListRoute.delete("/blacklists/:id", deleteBlackListUser)


module.exports = blackListRoute