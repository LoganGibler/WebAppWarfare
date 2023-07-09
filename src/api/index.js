import axios from "axios";
import { storeToken, StoreUser } from "../auth";
const BASE = "http://localhost:8000/";

export async function createPost(vmtitle, published, description, picture) {
  let published = false;
  try {
    const { data } = await axios.post("http://localhost:8000/createPost", {
      vmtitle: vmtitle,
      hostedby: hostedby,
      description: description,
      picture: picture,
    });

    // console.log("this is data after frontend api", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addStep() {
  let stepData =
    "This is the next step That i did. this got me here. now i can run scripts and stuff. gonna open a python term with root privs.";

  try {
    const { data } = await axios.post("http://localhost:8000/addstep", {
      stepData: stepData,
    });

    console.log("this is data after frontend api", data);
    return data;
  } catch (error) {
    throw error;
  }
}
