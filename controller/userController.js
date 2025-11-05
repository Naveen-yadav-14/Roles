const user = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports = {
   signUp: async(req, res) => {
    try {
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await user.create({email, password:hashedPassword});
        return res.status(200).json({message: "Sign up successfull"})
    } catch (error) {
        console.error('Error occurred:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
   }
}