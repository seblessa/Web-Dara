import http from "http";

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

server.on("connection", (socket) => {
  const { localAddress, localPort, remoteAddress, remotePort } = socket;
  console.log(`New connection: ${localAddress}:${localPort} -> ${remoteAddress}:${remotePort}`);
});
