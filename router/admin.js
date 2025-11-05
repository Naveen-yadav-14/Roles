const adminRoute = require("express").Router()
const authController = require("../controller/authController")

const roleController = require("../controller/roleController")


adminRoute.get("/dashboard",authController.dashboard)

adminRoute.get("/allroles",roleController.renderingRoles)


module.exports = adminRoute