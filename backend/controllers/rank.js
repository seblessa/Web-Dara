import { getUsersData, readUsersData } from "../data/data.js";

function handleRanking(sizeString) {
  let users = getUsersData();
  console.log(users);
  if (["6x5", "6x6", "5x6"].find((size) => size === sizeString)) {
    users.forEach((user) => {
      let gamesSize = user.games[sizeString].length;
      user.games = gamesSize;
      let victoriesSize = user.victories[sizeString];
      user.victories = victoriesSize;
      delete user.hash;
    });
    let ranking = users.sort((a, b) => {
      return b.victories - a.victories;
    });
    return ranking;
  } else {
    return {
      error: "Invalid size",
    };
  }
}

export const ranking = async (req, res) => {
  let data = "";
  var sizeString = "";
  var jsonData;
  readUsersData();

  await req.on("data", (chunk) => {
    data += chunk;
  });

  await new Promise((resolve, reject) => {
    req.on("end", () => {
      if (req.headers["content-type"] === "application/json") {
        jsonData = JSON.parse(data);
        sizeString += jsonData.size.rows + "x" + jsonData.size.columns;
      }
      resolve();
    });
    req.on("error", reject);
  });

  let rankingSorted = handleRanking(sizeString.toString());
  if ("error" in rankingSorted) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify(rankingSorted));
  } else {
    let body = {
      ranking: rankingSorted,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(body));
  }
  return res.end();
};
