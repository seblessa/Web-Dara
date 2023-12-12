import crypto from "crypto";
import { writeFileSync, readFileSync } from "fs";
import { readUsersData, writeUserData, getUsersData, checkUserExists, addUser } from "./data/data.js";

export const register = async (req, res) => {
  let data = "";
  let jsonData;
  let user;

  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    if (req.headers["content-type"] === "application/json") {
      jsonData = JSON.parse(data);
      try {
        user = {
          username: jsonData.nick,
          hash: crypto.createHash("md5").update(jsonData.password).digest("hex"),
        };
        if (checkUserExists(user.username)) {
          console.log("User already exists");
          res.statusCode = 200;
          return res.end();
        } else {
          addUser(user);
        }
        res.statusCode = 201; // Created
        return res.end("User created");
      } catch (error) {
        console.error("Error parsing JSON:", error.message);
        res.statusCode = 400; // Bad Request
        return res.end("Error parsing JSON");
      }
    } else {
      res.end("Received data: " + data);
    }
  });
  return res.end();
};

function validatePassword(password, hash) {
  const hashToverify = crypto.createHash("md5").update(password).digest("hex");
  return hashToverify === hash;
}
