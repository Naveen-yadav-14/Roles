const mongoose = require("mongoose");

const permissionsSchema = new mongoose.Schema({
    name: { type: String, required: false },
    slug: {type: String, required: false},
}, { timestamps: true }
);

const permissions = mongoose.model("permissions", permissionsSchema);
module.exports = permissions;