const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;

app.use(morgan("dev"));
app.use(express.json());

const uri = "mongodb+srv://kali:kali@cluster0.lhdtnc0.mongodb.net/";
const User = require("./db/userModel");
const Post = require("./db/postModel");

app.use((_, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  return next();
});

app.post("/createPost", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    // console.log(game);
    res.status(200).json({
      message: "Post created successfully.",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/addstep", async (req, res) => {
  console.log("this is req.body:", req.body);
  let step_string = req.body;
  let step_id = "64aafc169f72d53c88995234";
  try {
    const step = await Post.updateOne(
      {vmtitle: "New VM"},
      { $push:  {steps: step_string}}
    );
    if (step) {
      console.log("this is step:", step);
      res.status(200).json({
        message: "step added successfully.",
        step,
      });
    }
  } catch (error) {
    throw error;
  }
});

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
