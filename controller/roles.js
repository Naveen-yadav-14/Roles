

module.exports ={
    login: async (req, res) => {
        try {
          const email = req.body.email;
          const password = req.body.password;
          console.log(email, password);
          if (!email || !password) {
            req.flash("error", "Invalid fields");
            return res.redirect("/auth/login");
          }
          const adminExists = await admin.findOne({ email });
          if (!adminExists) {
            req.flash("error", "You dont have admin accessss");
            return res.redirect("/auth/login");
          }
          if (adminExists.status === "Inactive") {
            req.flash("error", "Your account is freezed");
            return res.redirect("/auth/login");
          }
          const matchedPassword = await bcrypt.compare(
            password,
            adminExists.password
          );
          if (!matchedPassword) {
            req.flash("error", "Password is wrong");
            return res.redirect("/auth/login");
          }
          
          req.session.save((err) => {
            if (err) {
              return next(err);
            }
            return res.redirect("/admin/v1/dashboard");
          });
        } catch (error) {
          console.log(error);
          req.flash("error", "Internal server error");
          return res.redirect("/auth/login");
        }
      },
}