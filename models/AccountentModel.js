const mongoose = require("mongoose");

const accountentSchema = new mongoose.Schema({
    name: { type: String, required: false },
    status: {type: String, required: false, default: "active"},
}, { timestamps: true }
);

const accountent = mongoose.model("accountent", accountentSchema);
module.exports = accountent;