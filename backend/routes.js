import http from "http";
import { register } from "./controllers/auth.js";

const routes = {
  GET: {
    "/": (req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("cona!\n");
    },
    "/register": register,
    "/about": (req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("About us!\n");
    },
    "/contact": (req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Contact us!\n");
    },
  },
  POST: {
    "/register": register,
  },
  default: (req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found\n");
  },
};

export default routes;
