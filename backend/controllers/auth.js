import crypto from "crypto";
import { writeFileSync, readFileSync } from "fs";

export const register = async (req, res) => {
  let data = "";
  let hash;
  let username;
  let jsonData;
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    // If the content type is JSON, parse the data
    if (req.headers["content-type"] === "application/json") {
      try {
        jsonData = JSON.parse(data);
        username = jsonData.nick;
        hash = crypto.createHash("md5").update(jsonData["password"]).digest("hex");
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

  const user = {
    username: username,
    password: hash,
  };
  const UsersData = readFileSync("backend/data/users.json");
  const Users = JSON.parse(UsersData);

  writeFileSync("../data/users.json", JSON.stringify(Users));
  res.writeHead(200, { "Content-Type": "text/plain", message: "User registered successfully" });

  return res.end();
};

function validatePassword(password, hash) {
  const hashToverify = crypto.createHash("md5").update(password).digest("hex");
  return hashToverify === hash;
}
