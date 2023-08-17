const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;
app.enable('trust proxy')
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const User = require("./db/userModel");
const Post = require("./db/postModel");
const Feedback = require("./db/feedbackModel");

app.use((_, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  return next();
});

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
      // console.log("this is step:", step);
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

app.post("/publishGuide", async (req, res) => {
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

app.post("/unpublishGuide", async (req, res) => {
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
      res.status(500).json({
        message: "/unpublishPost request unsuccessful on serverside.",
      });
    }
  } catch (error) {
    throw error;
  }
});

app.post("/getBlogById", async (req, res) => {
  try {
    let filter = { _id: req.body._id };
    // console.log("this is req.body._id:", req.body._id);
    let blog = await Post.findOne(filter);
    // console.log("this is blog:", blog);
    if (blog) {
      res
        .status(200)
        .json({ message: "/getBlogById request successful.", blog });
    } else {
      res.status(500).json({ message: "/getBlogById request failed." });
    }
  } catch (error) {
    throw error;
  }
});

app.post("/getBlogsByAuthor", async (req, res) => {
  try {
    let filter = { author: req.body.author };
    // console.log("this is req.body.author:", req.body.author);
    let blogs = await Post.find(filter);
    // console.log("this is blogs:", blogs);
    if (blogs) {
      res
        .status(200)
        .json({ message: "/getBlogByAuthor request successful.", blogs });
    } else {
      res.status(500).json({ message: "/getBlogByAuthor request failed." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/updateDescription", async (req, res) => {
  try {
    const { id, description } = req.body;
    const filter = { _id: id };
    const update = { description: description };
    const updatedGuide = await Post.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (!updatedGuide) {
      res.status(500).json({ message: "/updateDescription failed." });
    } else {
      res
        .status(200)
        .json({ message: "/updateDescription successful.", updatedGuide });
    }
  } catch (error) {
    res.status(500).json({ message: "/updateDescription failed." });
  }
});

app.post("/updateStep", async (req, res) => {
  try {
    const { id, index, newStepData } = req.body;
    let filter = { _id: id };
    let update = {};
    let editedStep = "steps." + index + ".step";
    update[editedStep] = newStepData;
    const updatedStep = await Post.findOneAndUpdate(filter, update, {
      new: true,
    });
    // console.log("This is updatedStep DB:", updatedStep);
    if (!updatedStep) {
      res.status(500).json({ message: "/updateStep failed on DB.." });
    } else {
      res
        .status(200)
        .json({ message: "/updateStep was successful", updatedStep });
    }
  } catch (error) {
    res.status(500).json({ message: "/updateStep failed on DB." });
  }
});

app.post(`${process.env.REMOVE_GUIDE_ENDPOINT}`, async (req, res) => {
  try {
    const filter = { _id: req.body._id };
    const deleted_guide = await Post.findOneAndDelete(filter, {
      new: true,
    });
    console.log(deleted_guide)
    res.status(200).json({ message: "guide successfully deleted." });
  } catch (error) {
    res.status(500).json({ message: "failed deleting guide" });
  }
});

app.post("/getGuidesBySearch", async (req, res) => {
  try {
    let allFoundGuides = [];
    const filter1 = { vmtitle: req.body.search };
    const foundGuidesBytitle = await Post.find(filter1);
    allFoundGuides.push(foundGuidesBytitle);

    const filter2 = { author: req.body.search };
    const foundGuidesByAuthor = await Post.find(filter2);
    allFoundGuides.push(foundGuidesByAuthor);

    const filter3 = { hostedby: req.body.search };
    const foundGuidesByHost = await Post.find(filter3);
    allFoundGuides.push(foundGuidesByHost);

    const filter4 = { difficulty: req.body.search };
    const foundGuidesByDiff = await Post.find(filter4);
    allFoundGuides.push(foundGuidesByDiff);

    console.log("here are found guides", allFoundGuides);
    if (allFoundGuides) {
      res.status(200).json({ allFoundGuides });
    } else {
      res.status(500).json({ message: "failed request on /getGuidesByTitle" });
    }
  } catch (error) {
    throw error;
  }
});

app.get("/getPublishedUnapprovedGuides", async (req, res)=>{
  try {
    const filter = {approved: false, published: true}
    const guides = Post.find(filter)
    console.log(guides)
    if (guides){
      res.status({message: "/getPublishedUnapprovedGuides request successful.", guides})
    } else{
      res.status(500).json({message: "failure fetching /getPublishedUnapprovedGuides"})
    }
  } catch (error) {
    res.status(500).json({message: "failed on request getPublishedUnapprovedGuides"})
  }
})
///////////////USER DB//////////////////////////////////////////////////////////////////////////////////////////
app.post("/Register", async (req, res) => {
  let fail = "fail";
  try {
    const { username, password } = req.body;
    // console.log("this is req.body", req.body);
    if (!username || !password) {
      res.status(404).json({
        message: "Please provide valid username and password",
      });
    }

    const user_check = await User.findOne({ username });
    // console.log("this is usercheck", user_check)
    if (!user_check) {
      const user = await User.create(req.body);
      // console.log("this is raw user", user);
      const token = jwt.sign({ username: user.username }, JWT_SECRET, {
        expiresIn: "1w",
      });
      res
        .status(200)
        .json({ message: "Account creation successful.", user, token });
    } else {
      res.status(200).json({ message: "Username Taken", fail });
    }
  } catch (error) {
    res.status(200).json({ message: error.message, fail });
  }
});

app.post("/Login", async (req, res) => {
  try {
    let fail = "fail";
    const { username, password } = req.body;
    // console.log("username: ", username, "password: ", password);
    if (!username || !password) {
      res
        .status(500)
        .json({ message: "Please provide username and password." });
    } else {
      const user = await User.findOne({ username, password });
      if (user) {
        const token = jwt.sign({ username: user.username }, JWT_SECRET, {
          expiresIn: "3w",
        });
        res.status(200).json({ message: "Login successful", user, token });
      } else {
        res
          .status(200)
          .json({ message: "Username or password was incorrect.", fail });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Login Failed.", fail });
  }
});

app.post("/getUserIDByUsername", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res
        .status(200)
        .json({ message: "getUserIDByUsername successful.", user });
    }
  } catch (error) {
    res.status(500).json({ message: "getUserIDByUsername failed." });
  }
});

app.post("/44a312daf9f1a589cb7635630a222ff4", async (req, res) => {
  console.log(process.env.ADMIN_PASS);
  console.log(req.body.pass);
  try {
    if (req.body.pass === process.env.ADMIN_PASS) {
      let filter = { _id: req.body._id };
      let update = { admin: true };
      const modded_user = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      res
        .status(200)
        .json({ message: "User permissions updated", modded_user });
    } else {
      res.status(500).json({ message: "Failed on user to admin" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error setting admin account" });
  }
});


// app.post("/getGuidesByAuthor", async (req, res)=>{
//   try {
//     const foundGuides = await Post.findMany(req.body.search)
//     if (foundGuides){
//       res.status(200).json({foundGuides})
//     } else{
//       res.status(500).json({message: "failed request on /getGuidesByTitle"})
//     }
//   } catch (error) {
//     throw error
//   }
// })

// FEEDBACK FUNCTIONS////////////////////////////////////////////////

app.post("/sendFeedback", async (req, res) => {
  const { submittedBy, subject, comment } = req.body;
  // console.log(submittedBy, subject, comment)
  try {
    const sendComment = await Feedback.create(req.body);
    // console.log("this is sendComment:", sendComment)
    // if (sendComment) {
    //   res.status(200).json({ message: "Feedback successfully sent.", sendComment });
    // } else {
    //   res.status(500).json({ message: "Feedback failed to send on DB" });
    // }
    res.status(200).json({ message: "Here is sendComment", sendComment });
  } catch (error) {
    res.status(500).json({ message: "Feedback failed on DB." });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on port: ${process.env.PORT}`);
    });
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
