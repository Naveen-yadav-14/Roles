const roleRoute = require("express").Router()


const authController = require("../controller/authController")




roleRoute.get("/login",authController.renderLogin)
roleRoute.post("/login",authController.login)





module.exports = roleRoute