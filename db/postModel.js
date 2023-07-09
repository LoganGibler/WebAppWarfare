const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  vmtitle: {
    type: String,
    required: [true, "Please enter the title of this vm."],
  },
  hostedby: {
    type: String,
    required: [true, "Please enter where you found this vm."],
  },
  description: {
    type: String,
    required: [true, "Please provide a description of this vm."],
  },
  picture: {
    type: String,
    required: [true, "Please provide a fitting picture"],
  },
  steps: [
    {
      body: String,
      date: Date,
    },
  ],

  published: {
    type: Boolean,
  },
  //   should have a date, and a finalized button.
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
