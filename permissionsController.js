const permissions = require("./models/permissionsModel");

module.exports = {
    allPermissions: async (req, res) => {
        try {
            const allPermissions = await permissions.find().sort({ createdAt: -1 });
            return res.render("allPermissions", {
                allPermissions,
                success: req.flash("success"),
                error: req.flash("error"),
            })
        } catch (error) {
            console.log(error);
            req.flash("error", "Internal server error");
            return res.redirect("/admin/dashboard");
        }
    },
    addPermission: async (req, res) => {
        try {
            const { name, slug } = req.body;
            await permissions.create({ name, slug });
            req.flash("success", "Permission added successfully");
            return res.redirect("/admin/allpermissions");
        } catch (error) {
            console.log(error);
            req.flash("error", "Internal server error");
            return res.redirect("/admin/dashboard");
        }
    },
    deletePermission: async (req, res) => {
        try {
            const permissionId = req.params.id;
            await permissions.findByIdAndDelete(permissionId);
            req.flash("success", "permission deleted successfully");
            return res.redirect("/admin/allpermissions");
        } catch (error) {
            console.log(error);
            req.flash("error", "Internal server error");
            return res.redirect("/admin/dashboard");
        }
    },
}