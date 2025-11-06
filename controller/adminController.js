const user = require("../models/userModel");
const bcrypt = require('bcryptjs');
const roles = require("../models/rolesModel")
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
    singleAdmin: async (req, res) => {
        try {
          console.log(req.params);
          const adminId = req.params.id;
          const adminExists = await user.findById(adminId);
          const Roles = await roles.find();
          if (!adminExists) {
            req.flash("error", "Admin not found");
            return res.redirect("/admin/allusers");
          }
          return res.render("singleAdmin", {
            adminExists,
            Roles
          });
        } catch (error) {
          console.error("Error occurred:", error.message);
          return res.redirect("/admin/dashboard");
        }
      },
      assignRole: async (req,res)=>{
        try{
          const { id } = req.params
          if(!id){
            req.flash("error","id is undefind")
            return res.redirect("/admin/dashboard")
          }
            const {status} = req.body
            if(!status){
              req.flash("error","status is undefind")
              return res.redirect("status is undefind")
            }
           await user.findByIdAndUpdate({_id:id},{$set:{role:status}})
           return res.redirect("/admin/allusers")
        }catch(err){
          console.log(err.message)
          return res.redirect("/admin/dashboard")
        }
      }     
}