import axios from "axios";
import { storeToken, StoreUser } from "../auth";
import { async } from "q";
const BASE = "http://localhost:8000/";

export async function createPost(
  vmtitle,
  hostedby,
  description,
  picture,
) {
  let published = false;
  try {
    const { data } = await axios.post("http://localhost:8000/createPost", {
      vmtitle: vmtitle,
      hostedby: hostedby,
      description: description,
      picture: picture,
      published: published,
    });

    // console.log("this is data after frontend api", data);
    return data;
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

export async function getAllBlogs(){
  try {
    const {data} = await axios.get("http://localhost:8000/allblogs")
    return data
  } catch (error) {
    throw error
  }
}
