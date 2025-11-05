const mongoose = require("mongoose");

const frontDeskSchema = new mongoose.Schema({
    name: { type: String, required: false },
    status: {type: String, required: false, default: "active"},
}, { timestamps: true }
);

const frontDesk = mongoose.model("frontDesk", frontDeskSchema);
module.exports = frontDesk;