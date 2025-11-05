const roleRoute = require("express").Router()


const rolesController = require("../controller/roles")




roleRoute.get("/login",rolesController.renderLogin)
roleRoute.post("/login",rolesController.login)





module.exports = roleRoute