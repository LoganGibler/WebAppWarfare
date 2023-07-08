const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;

app.use(morgan("dev"));
app.use(express.json());

const uri = "mongodb://localhost:27017/WebAppWarfare";
const User = require("./models/userModel");
const Post = require("./models/postModel");

mongoose
  .connect(uri)
  .then(() => {
    app.listen(8000, () => {
      console.log("server is running on port 8000");
    });
    console.log("connected to mongodb");
  })
  .catch(() => {
    consolelog(error);
  });
