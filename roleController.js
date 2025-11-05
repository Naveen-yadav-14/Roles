const roles = require("./models/rolesModel");

module.exports = {
    addRole: async(req, res) => {
        try {
            const {roleName, permissions} = req.body;
            await roles.create(roleName, permissions);
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.render('/admin/v1/dashboard');
        }
    }
}