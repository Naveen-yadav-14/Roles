const adminRoute = require("express").Router()
const rolesController = require("../controller/roles")
const permissionsController = require("../controller/permissionsController")
const userController = require("../controller/userController")


adminRoute.get("/dashboard",rolesController.dashboard)
adminRoute.get("/allPermissions", permissionsController.allPermissions)
adminRoute.get("/allusers", userController.allUsers);
adminRoute.post("/addpermission", permissionsController.addPermission);
adminRoute.get("/allpharmacy", userController.allPharmacy);
adminRoute.get("/allaccountent", userController.allAccountent);
adminRoute.get("/allfrontdesk", userController.allFrontDesk);


module.exports = adminRoute