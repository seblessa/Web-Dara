import http from "http";
import { register } from "./auth.js";
import { ranking } from "./controllers/rank.js";
import { join } from "./controllers/game.js";

const routes = {
  GET: {},
  POST: {
    "/register": register,
    "/ranking": ranking,
    "/join": join,
  },
  default: (req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found\n");
  },
};

export default routes;
