import { getUsersData } from "../data/data.js";

function handleRanking(sizeString) {
  let users = getUsersData();
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
}

export const ranking = async (req, res) => {
  let data = "";
  var sizeString = "";
  var jsonData;

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

  let rankingSorted = handleRanking(sizeString);
  let body = {
    ranking: rankingSorted,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(body));
  return res.end();
};
