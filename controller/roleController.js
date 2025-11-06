const roles = require("../models/rolesModel");
const permissions = require("../models/permissionsModel")

module.exports = {
    renderingRoles:async (req,res)=>{
        try{
            const allRoles = await roles.find().populate("permissions").lean()
            const allPermissions = await permissions.find();
            return res.render("roles",{
                allRoles,
                allPermissions
            })
        }catch(err){
          console.log(err.message)
          return res.redirect("/admin/dashboard")
        }
    },
    addRole: async (req,res) => {
        try {
          const { roleName, permissionName } = req.body;
          const permissionsArray = Array.isArray(permissionName)
          ? permissionName
          : [permissionName];
          await roles.create({
            roleName:roleName,
            permissions:permissionsArray
          })
      
          req.flash("success", "Permission added successfully");
          return res.redirect("/admin/allroles")
        } catch (error) {
          console.error("Error occurred:", error.message);
          return res.status(500).json({ success: false, message: "Server Error" });
        }
      },
      
    allRoles: async (req, res) => {
        try {
            const allRoles = await roles.find().sort({ createdAt: -1 })
            return res.render("allRoles", {
                allRoles,
                success: req.flash("success"),
                error: req.flash("error"),
            }
            )
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.render('/admin/dashboard');
        }
    }
}