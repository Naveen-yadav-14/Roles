const adminRoute = require("express").Router()
const rolesController = require("../controller/roles")


adminRoute.get("/dashboard",rolesController.dashboard)


module.exports = adminRoute