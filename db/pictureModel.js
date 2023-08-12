import mongoose from "mongoose";

const pictureSchema = mongoose.Schema(
  {
    title: String,
    image: String,
  },
  { timestamps: true }
);
const Picture = mongoose.model("Picture", pictureSchema);

export default Picture;
