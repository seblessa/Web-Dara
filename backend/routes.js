import http from "http";
import { register } from "./auth.js";
import { ranking } from "./controllers/rank.js";

const routes = {
  GET: {
    "/notify": (req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("About us!\n");
    },
    "/join": (req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Contact us!\n");
    },
  },
  POST: {
    "/register": register,
    "/ranking": ranking,
  },
  default: (req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found\n");
  },
};

export default routes;
