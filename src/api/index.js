import axios from "axios";
import { storeToken, StoreUser } from "../auth";
import { async } from "q";
const BASE = "http://localhost:8000/";

export async function createPost(
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
  console.log("THis IS DATE", date);

  try {
    const { data } = await axios.post("http://localhost:8000/createPost", {
      vmtitle: vmtitle,
      hostedby: hostedby,
      description: description,
      published: published,
      author: author,
      date: date,
      difficulty: difficulty,
    });

    // console.log("this is data after frontend api", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllBlogs() {
  try {
    const allBlogs = await axios.get("http://localhost:8000/allblogs");
    if (!allBlogs) {
      console.log("error fetching all blogs on /api/allblogs");
    }
    return allBlogs;
  } catch (error) {
    throw error;
  }
}

export async function getAllPublishedBlogs() {
  try {
    const allBlogs = await axios.get("http://localhost:8000/allPublishedBlogs");
    if (!allBlogs) {
      console.log("error fetching all blogs on /api/allPublishedBlogs");
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
    const { data } = await axios.post("http://localhost:8000/addstep", {
      _id: _id,
      step: step,
    });

    console.log("this is data after frontend api", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBlogById(id) {
  try {
    const { data } = await axios.post("http://localhost:8000/getBlogById", {
      id: id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserIDByUsername(username) {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/getUserIDByUsername",
      {
        username: username,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBlogsByUsername(author) {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/getBlogsByAuthor",
      {
        author: author,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDescription(id, description) {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/updateDescription",
      {
        id: id,
        description: description,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateSteppie(id, index, newStepData) {
  try {
    const { data } = await axios.post("http://localhost:8000/updateStep", {
      id: id,
      index: index,
      newStepData: newStepData,
    });
  } catch (error) {
    throw error;
  }
}

export async function publishGuide(_id) {
  try {
    const { data } = await axios.post("http://localhost:8000/publishGuide", {
      _id: _id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function unpublishGuide(_id) {
  try {
    const { data } = axios.post("http://localhost:8000/unpublishGuide", {
      _id: _id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
// user api calls/////////////////////////////////////

export async function registerUser(username, password) {
  try {
    const { data } = await axios.post("http://localhost:8000/Register", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post("http://localhost:8000/Login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
