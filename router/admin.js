const adminRoute = require("express").Router()
const authController = require("../controller/authController")

const roleController = require("../controller/roleController")
const rolesController = require("../controller/roles")
const permissionsController = require("../controller/permissionsController")
const userController = require("../controller/userController")


adminRoute.get("/dashboard",authController.dashboard)

adminRoute.get("/allroles",roleController.renderingRoles)
adminRoute.get("/allPermissions", permissionsController.allPermissions)
adminRoute.get("/allusers", userController.allUsers);
adminRoute.post("/addpermission", permissionsController.addPermission);
adminRoute.get("/allpharmacy", userController.allPharmacy);
adminRoute.get("/allaccountent", userController.allAccountent);
adminRoute.get("/allfrontdesk", userController.allFrontDesk);


module.exports = adminRoute