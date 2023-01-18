const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    username: { type: String, required: true, unique: true },
    displayname: { type: String },
    headline: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    zipcode: { type: Number },
    dob: { type: Date },
    avatar: { type: String },
    isOAuth: { type: Boolean, required: true },
    accountLinkWithGoogle: { type: Boolean, required: true },
});

module.exports = mongoose.model("Profile", profileSchema);
