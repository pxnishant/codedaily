const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  problems: [
    {
      id: { type: String, required: true },
      difficulty: [{ type: mongoose.Schema.Types.Mixed }],
      tags: [{ type: mongoose.Schema.Types.Mixed }]
    }
  ],
  sent: [{ type: String }]
});

const User = mongoose.model("newUser", userSchema);

module.exports = User;
