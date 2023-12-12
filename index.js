import Server from "./backend/server.js";
import routes from "./backend/routes.js";
import { printUsers, readUsersData } from "./backend/data/data.js";

const PORT = 8014;
const server = new Server(routes);

server.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "...");
  readUsersData();
});

server.on("error", (err) => {
  console.error(err);
});

server.on("listening", () => {
  console.log("Server is listening...");
});

server.on("connection", (socket) => {
  console.log("IP address of client: ", socket.remoteAddress);
});
