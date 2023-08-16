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

//   let xml = new XMLHttpRequest();
//   xml.open("POST", "http://localhost:5000/hash_pass", true);
//   xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xml.setRequestHeader("Access-Control-Allow-Origin", "*");
//   xml.onload = function () {
//     let hashedPassword = JSON.stringify(this.responseText);
//     console.log("this is hashed password in function", hashedPassword);
//     hashedPassword = hashedPassword.split('"');
//     console.log("this is hashed password after split", hashedPassword);
//     md5 = hashedPassword[4].slice(0, -1);
//     console.log("This is md5 hash after:", md5);
//   };
//   console.log(xml);
//   let dataSend = JSON.stringify({ "Data sent from js": password });
//   console.log("This si send data",dataSend)
//   xml.send(dataSend);
