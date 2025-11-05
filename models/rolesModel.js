const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    roleName: { type: String, required: false },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "permissions",
            required: false
        }
    ]
}, { timestamps: true }
);

const roles = mongoose.model("roles", roleSchema);
module.exports = roles;