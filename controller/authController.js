const user = require("../models/userModel")
const bcrypt = require("bcryptjs")

module.exports ={
    renderLogin: async (req, res) => {
        try {
          return res.render("index", {
            success: req.flash("success"),
            error: req.flash("error"),
          });
        } catch (error) {
          console.log("error", error);
          return res.redirect("/auth/login");
        }
      },
    login: async (req, res) => {
        try {
          const email = req.body.email;
          const password = req.body.password;
          if (!email || !password) {
            req.flash("error", "Invalid fields");
            return res.redirect("/auth/login");
          }
          const userExists = await user.findOne({ email }).populate({
        path: "role",
        populate: { path: "permissions", model: "permissions" }
      });
          if (!userExists) {
            req.flash("error", "You dont have admin accessss");
            return res.redirect("/auth/login");
          }
          if (userExists.status === "Inactive") {
            req.flash("error", "Your account is freezed");
            return res.redirect("/auth/login");
          }
          const matchedPassword = await bcrypt.compare(
            password,
            userExists.password
          );
          if (!matchedPassword) {
            req.flash("error", "Password is wrong");
            return res.redirect("/auth/login");
          }
          req.session.superAdmin = userExists._id;

    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        req.flash("error", "Failed to create session");
        return res.redirect("/auth/login");
      }
      return res.redirect("/admin/dashboard");
    });
        } catch (error) {
          console.log(error);
          req.flash("error", "Internal server error");
          return res.redirect("/auth/login");
        }
      },
      dashboard : async (req,res)=>{
        try{
            return res.render("dashboard")

        }catch(err){
            console.log(err.message)
            return res.redirect("/auth/login")
        }

      },
      logOut: async (req, res) => {
        try {
          req.session.destroy();
          return res.redirect("/auth/login");
        } catch (error) {
          req.flash("error", "Internal server error");
          return res.redirect("/auth/login");
        }
      },
}