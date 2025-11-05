const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
    name: { type: String, required: false },
    status: {type: String, required: false, default: "active"},
}, { timestamps: true }
);

const pharmacy = mongoose.model("pharmacy", pharmacySchema);
module.exports = pharmacy;