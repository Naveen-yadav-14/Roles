const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: false },
    password: {type: String, required: false},
}, { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user;