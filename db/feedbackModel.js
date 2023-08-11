const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    unique: true,
    required: [true, "Please enter username"],
  },
  subject: {
    type: String
  },
  comment: {
    type: String,
    minlength: 6,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;