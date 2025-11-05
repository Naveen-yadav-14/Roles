const user = require("../models/userModel");
const bcrypt = require('bcryptjs');

module.exports = {
    addAdmin: async(req, res) => {
        try {
            const {email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await user.create({email, password: hashedPassword})
            req.flash("success", "Admin added successfully")
            return res.redirect("/admin/allusers");
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.redirect('/admin/dashboard');
        }
    },
    singleAdmin: async(req, res) => {
        try {
            console.log(req.params)
            const adminId = req.params.id;
            const adminExists = await user.findById(adminId);
            if(!adminExists){
                req.flash("error", "Admin not found")
                return res.redirect("/admin/allusers")
            }
            return res.render("singleAdmin",{
                adminExists,
            })
        } catch (error) {
            console.error('Error occurred:', error.message);
            return res.redirect('/admin/dashboard');
        }
    }
}