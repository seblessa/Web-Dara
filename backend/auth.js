import crypto from "crypto";
import { checkUserExists, addUser } from "./data/data.js";

export const register = async (req, res) => {
  let data = "";
  let jsonData;
  var user;
  let toWrite;
  var status;
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    if (req.headers["content-type"] === "application/json") {
      jsonData = JSON.parse(data);
      user = {
        username: jsonData.nick,
        hash: crypto.createHash("md5").update(jsonData.password).digest("hex"),
        games: {
          "6x5": [],
          "6x6": [],
          "5x6": [],
        },
        victories: {
          "6x5": 0,
          "6x6": 0,
          "5x6": 0,
        },
      };
      let result = checkUserExists(user.username);
      if (result.value) {
        console.log("User already exists");
        if (validatePassword(jsonData.password, result.user.hash)) {
          status = 200;
        } else {
          toWrite = { error: "User registered with a different password" };
          status = 401;
        }
      } else {
        addUser(user);
        status = 201;
      }
    }
    res.statusCode = status;
    if (toWrite) res.write(JSON.stringify(toWrite));
    return res.end();
  });
};

function validatePassword(password, hash) {
  const hashToverify = crypto.createHash("md5").update(password).digest("hex");
  return hashToverify === hash;
}
