import { getUsersData } from "../data/data.js";

export const ranking = async (req, res) => {
  let users = getUsersData();
  let ranking = users.sort((a, b) => {
    return b.victories - a.victories;
  });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(ranking));
  return res.end();
};
