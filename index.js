import Server from "./backend/server.js";
import routes from "./backend/routes.js";
const PORT = 8014;
const server = new Server(routes);

server.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "...");
});

server.on("error", (err) => {
  console.error(err);
});

server.on("connection", (socket) => {
  console.log("IP address of client: ", socket.remoteAddress);
});
