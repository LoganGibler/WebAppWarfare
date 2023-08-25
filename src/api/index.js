import axios from "axios";
import { storage } from "../firebase.js";
import { ref } from "firebase/storage";
require("dotenv").config();

const env = "QA";
if (env === "main") {
  var BASE = "https://webappwarfare-api.onrender.com";
} else {
  var BASE = "http://localhost:8000";
}

// console.log("api connection string:", BASE);
export async function createGuide(
  vmtitle,
  hostedby,
  description,
  author,
  difficulty
) {
  let published = false;
  let preformattedDate = new Date();
  let day = preformattedDate.getDate();
  let month = preformattedDate.getMonth() + 1;
  let year = preformattedDate.getFullYear();
  let date = `${month}-${day}-${year}`;
  let approved = false;

  try {
    const { data } = await axios.post(`${BASE}/createPost`, {
      vmtitle: vmtitle,
      hostedby: hostedby,
      description: description,
      published: published,
      author: author,
      date: date,
      difficulty: difficulty,
      approved: approved,
    });

    // console.log("this is data after frontend api", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllBlogs() {
  try {
    const allBlogs = await axios.get(`${BASE}/allblogs`);
    if (!allBlogs) {
      console.log("error fetching all blogs on /api/allblogs");
    }
    return allBlogs;
  } catch (error) {
    throw error;
  }
}

export async function getAllPublishedGuides() {
  try {
    const allBlogs = await axios.get(`${BASE}/allPublishedBlogs`);
    if (!allBlogs) {
      // console.log("error fetching all blogs on /api/allPublishedBlogs");
    }
    return allBlogs;
  } catch (error) {
    throw error;
  }
}

export async function addStep(_id, step) {
  console.log("_id on api:", _id);
  console.log("step on api:", step);
  try {
    const { data } = await axios.post(`${BASE}/addstep`, {
      _id: _id,
      step: step,
    });

    // console.log("this is data after frontend api", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBlogById(_id) {
  try {
    const { data } = await axios.post(`${BASE}/getBlogById`, {
      _id: _id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBlogsByUsername(author) {
  try {
    const { data } = await axios.post(`${BASE}/getBlogsByAuthor`, {
      author: author,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDescription(id, description) {
  try {
    const { data } = await axios.post(`${BASE}/updateDescription`, {
      id: id,
      description: description,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateSteppie(id, index, newStepData) {
  try {
    const { data } = await axios.post(`${BASE}/updateStep`, {
      id: id,
      index: index,
      newStepData: newStepData,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function publishGuide(_id) {
  try {
    const { data } = await axios.post(`${BASE}/publishGuide`, {
      _id: _id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function unpublishGuide(_id) {
  try {
    const { data } = axios.post(`${BASE}/unpublishGuide`, {
      _id: _id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteGuide(_id) {
  try {
    const { data } = await axios.post(
      `${BASE}/removeGuided126d2c7cd71ad50a20e59f89afaf380`,
      {
        _id: _id,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getGuidesBySearch(search) {
  try {
    const { data } = await axios.post(`${BASE}/getGuidesBySearch`, {
      search: search,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPublishedUnapprovedGuides() {
  try {
    const { data } = await axios.get(`${BASE}/getPublishedUnapprovedGuides`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function approveGuide(_id) {
  try {
    const { data } = await axios.post(`${BASE}/approveGuide`, {
      _id: _id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteStep(_id, index) {
  try {
    console.log("This is passed in index", index);
    const deletedStep = await axios.post(`${BASE}/deleteStep`, {
      _id: _id,
      index: index,
    });

    return deletedStep;
  } catch (error) {
    throw error;
  }
}
// user api calls/////////////////////////////////////

export async function registerUser(username, password) {
  try {
    const { data } = await axios.post(`${BASE}/Register`, {
      username: username,
      password: password,
    });
    // console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post(`${BASE}/Login`, {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserByID(_id) {
  try {
    const { data } = await axios.post(`${BASE}/getUserByID`, {
      _id: _id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserIDByUsername(username) {
  try {
    const { data } = await axios.post(`${BASE}/getUserIDByUsername`, {
      username: username,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// feedbackSchema api calls
export async function sendFeedbackToDB(submittedBy, subject, comment) {
  // console.log(submittedBy, subject, comment)
  try {
    const { data } = await axios.post(`${BASE}/sendFeedback`, {
      submittedBy: submittedBy,
      subject: subject,
      comment: comment,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// IMAGE UPLOAD API CALLS

export async function getImagesByGuideID(guide_id) {
  try {
    const { data } = await axios.post(`${BASE}/getImagesByGuideID`, {
      guide_id: guide_id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteImg(id, index) {
  try {
    const fileRef = ref(storage, `images/${id}/` + index);
    console.log("this is fileref on api:", fileRef);
    // await deleteDoc(fileRef);
    return fileRef;
  } catch (error) {
    throw error;
  }
}

export async function deleteGuideImages(id) {
  try {
  } catch (error) {
    throw error;
  }
}
