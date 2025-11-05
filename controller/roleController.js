const roles = require("../models/rolesModel");
const permissions = require("../models/permissionsModel")

module.exports = {


    renderingRoles:async (req,res)=>{
        try{
            const Permissions = await permissions.find()
            return res.render("roles",{
                Permissions 
            })
        }catch(err){
          console.log(err.message)
          return res.redirect("/admin/dashboard")

        }
    },
    addRole: async (req, res) => {
        try {
            const { roleName,value } = req.body;
            console.log(roleName,value)
            
            // await roles.create({ roleName, permissions });
            req.flash("success", "Permission added successfully");
            return res.redirect("/admin/allpermissions");
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.render('/admin/dashboard');
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