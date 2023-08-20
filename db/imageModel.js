const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    image: String,
    step_index: Number,
    guide_id: String,
  },
);
const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
