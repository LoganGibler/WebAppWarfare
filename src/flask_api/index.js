import axios from "axios";
const BASE = "https://webappwarfare-hashpass-api.onrender.com";

export async function hashPassword(password) {
  console.log("This is passed in password:", password);
  const response = await axios.post(`${BASE}/hash_pass`, {
    password: password,
  });

  console.log("This response from flask api", response);
  return response;
}



