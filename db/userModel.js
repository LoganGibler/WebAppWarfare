const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter email"],
  },
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
  // need to add followers as a number first, then who is actually following who?
});

const User = mongoose.model("User", userSchema);

module.exports = User;