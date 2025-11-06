const user = require("../models/userModel");

const setUserPermissions = async (req, res, next) => {
    try {
        if (req.session.superAdmin) {
            //   const userExists = await user.findById(req.session.superAdmin)
            //     .populate("permissions", "slug")
            //     .lean();
            const userExists = await user.findById(req.session.superAdmin)
                .populate({ path: "role", populate: { path: "permissions" } })
                .lean();
            res.locals.userPermissions = userExists.role.permissions.map(p => p.slug);
            //   const permissionSlugs = userExists?.role?.permissions?.map(p => p.slug) || [];
            //   console.log("User Permissions:", permissionSlugs);
            //   res.locals.userPermissions = permissionSlugs;
            res.locals.loggedInUser = userExists;
        } else {
            res.locals.userPermissions = [];
        }
        next();
    } catch (err) {
        console.error("Permission middleware error:", err);
        res.locals.userPermissions = [];
        next();
    }
};

module.exports = setUserPermissions;