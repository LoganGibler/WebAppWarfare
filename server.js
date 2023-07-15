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

const uri = "mongodb://localhost:27017";
const User = require("./db/userModel");
const Post = require("./db/postModel");
const { ObjectId } = require("bson");

app.use((_, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  return next();
});

// should add date created
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
  // let step_string = req.body;
  // let step_id = "64b284c5c74fcec8a26cce6e";
  try {
    let new_step = {
      step: req.body.step,
    };
    const step = await Post.updateOne(
      { _id: req.body._id },
      { $push: { steps: new_step } }
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

app.get("/allblogs", async (req, res) => {
  try {
    const allblogs = await Post.find({});

    if (allblogs) {
      res.status(200).json({ message: "/allblogs request: ", allblogs });
    } else {
      res.status(500).json({ message: "/allblogs request failed serverside." });
    }
  } catch (error) {
    throw error;
  }
});

app.get("/allPublishedBlogs", async (req, res) => {
  try {
    const allPublishedBlogs = await Post.find({ published: true });

    if (allPublishedBlogs) {
      res.status(200).json({
        message: "/allPublishedblogs request successful",
        allPublishedBlogs,
      });
    } else {
      res
        .status(500)
        .json({ message: "/allPublishedBlogs request failed serverside." });
    }
  } catch (error) {
    throw error;
  }
});

app.post("/publishPost", async (req, res) => {
  let filter = { _id: req.body._id };
  let update = { published: true };
  try {
    const updatedPost = await Post.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (updatedPost.published) {
      res
        .status(200)
        .json({ message: "/publishPost request successful.", updatedPost });
    } else {
      res.status(500).json({ message: "/publishPost request successful." });
    }
  } catch (error) {
    throw error;
  }
});

app.post("/unpublishPost", async (req, res) => {
  let filter = { _id: req.body._id };
  let update = { published: false };
  try {
    const updatedPost = await Post.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (updatedPost.published === false) {
      res
        .status(200)
        .json({ message: "/unpublishPost request successful.", updatedPost });
    } else {
      res
        .status(500)
        .json({
          message: "/unpublishPost request unsuccessful on serverside.",
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
