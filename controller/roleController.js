const roles = require("../models/rolesModel");

module.exports = {
    addRole: async (req, res) => {
        try {
            const { roleName, permissions } = req.body;
            await roles.create({ roleName, permissions });
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