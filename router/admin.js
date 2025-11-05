const adminRoute = require("express").Router()
const rolesController = require("../controller/roles")


adminRoute.get("/dasboard",rolesController.dashboard)


module.exports = adminRoute