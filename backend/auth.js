import crypto from "crypto";
import { writeFileSync, readFileSync } from "fs";

export const register = async (req, res) => {
  let data = "";
  let hash;
  let username;
  let jsonData;
  let user;
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    // If the content type is JSON, parse the data
    if (req.headers["content-type"] === "application/json") {
      try {
        jsonData = JSON.parse(data);
        username = jsonData.nick;
        console.log(jsonData);
        hash = crypto.createHash("md5").update(jsonData["password"]).digest("hex");
        user = {
          username: username,
          password: hash,
        };
        res.end("Data received and parsed successfully");
      } catch (error) {
        console.error("Error parsing JSON:", error.message);
        res.statusCode = 400; // Bad Request
        res.end("Error parsing JSON");
      }
    } else {
      // Handle other content types as needed
      res.end("Received data: " + data);
    }
  });
  console.log();
  const UsersData = readFileSync("backend/data/users.json");

  let Users;

  try {
    Users = JSON.parse(UsersData.toString());

    Users = Array.isArray(Users) ? Users : [];
  } catch (error) {
    console.error("Error parsing existing users data:", error.message);
    Users = [];
  }

  const updatedUsers = [...Users, user];

  writeFileSync("backend/data/users.json", JSON.stringify(updatedUsers));

  res.writeHead(200, { "Content-Type": "text/plain", message: "User registered successfully" });

  return res.end();
};

function validatePassword(password, hash) {
  const hashToverify = crypto.createHash("md5").update(password).digest("hex");
  return hashToverify === hash;
}
