const accountent = require("../models/AccountentModel");
const frontDesk = require("../models/frontDeskModel");
const pharmacy = require("../models/pharmacyModel");
const user = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports = {
   signUp: async(req, res) => {
    try {
        const {name, password} = req.body;
        // const hashedPassword = await bcrypt.hash(password, 10);
        await accountent.create({name});
        return res.status(200).json({message: "Sign up successfull"})
    } catch (error) {
        console.error('Error occurred:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
   },
   allUsers: async (req, res) => {
           try {
               const allUsers = await user.find().sort({ createdAt: -1 });
               return res.render("allAdmins", {
                   allAdmins:allUsers,
                   success: req.flash("success"),
                   error: req.flash("error"),
               })
           } catch (error) {
               console.log(error);
               req.flash("error", "Internal server error");
               return res.redirect("/admin/dashboard");
           }
    },
    allPharmacy: async (req, res) => {
           try {
               const allPharmacy = await pharmacy.find().sort({ createdAt: -1 });
               return res.render("pharmacy", {
                   allPharmacy,
                   success: req.flash("success"),
                   error: req.flash("error"),
               })
           } catch (error) {
               console.log(error);
               req.flash("error", "Internal server error");
               return res.redirect("/admin/dashboard");
           }
    },
    allFrontDesk: async (req, res) => {
           try {
               const allFrontDesk = await frontDesk.find().sort({ createdAt: -1 });
               return res.render("frontDesk", {
                   allFrontDesk,
                   success: req.flash("success"),
                   error: req.flash("error"),
               })
           } catch (error) {
               console.log(error);
               req.flash("error", "Internal server error");
               return res.redirect("/admin/dashboard");
           }
    },
    allAccountent: async (req, res) => {
           try {
               const allAccountent = await accountent.find().sort({ createdAt: -1 });
               return res.render("accountent", {
                   allAccountent,
                   success: req.flash("success"),
                   error: req.flash("error"),
               })
           } catch (error) {
               console.log(error);
               req.flash("error", "Internal server error");
               return res.redirect("/admin/dashboard");
           }
    },
}