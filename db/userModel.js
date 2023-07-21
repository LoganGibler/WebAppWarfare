const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please enter username"],
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "Please enter password"],
  },
  admin: {
    type: Boolean
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;