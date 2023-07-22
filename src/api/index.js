import axios from "axios";
import { storeToken, StoreUser } from "../auth";
import { async } from "q";
const BASE = "http://localhost:8000/";

export async function createPost(vmtitle, hostedby, description, picture, author) {

  let published = false;
  let preformattedDate = new Date()
  let day = preformattedDate.getDate()
  let month = preformattedDate.getMonth() + 1
  let year = preformattedDate.getFullYear()

  let date = `${month}-${day}-${year}`
  console.log("THis IS DATE",date)

  try {
    const { data } = await axios.post("http://localhost:8000/createPost", {
      vmtitle: vmtitle,
      hostedby: hostedby,
      description: description,
      picture: picture,
      published: published,
      author: author,
      date: date
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
