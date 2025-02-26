const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    difficulty: { type: [Boolean], default: [] },
    topics: { type: [Boolean], default: [] },
    sentAlready: { type: [Number], default: [] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
