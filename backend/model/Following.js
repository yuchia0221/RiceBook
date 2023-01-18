const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followingSchema = new Schema({
    username: { type: String, required: true, unique: true },
    following: [String],
});

module.exports = mongoose.model("Following", followingSchema);
