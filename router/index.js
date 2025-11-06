const roleRoute = require("express").Router()


const authController = require("../controller/authController")




roleRoute.get("/login",authController.renderLogin)
roleRoute.post("/login",authController.login)
roleRoute.get("/logout",authController.logOut)





module.exports = roleRoute