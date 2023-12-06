import http from "http";

export default class Server {
  constructor(routes) {
    this.routes = routes;
    this.server = http.createServer((req, res) => {
      const method = req.method;
      const url = req.url;
      const handler = (this.routes[method] && this.routes[method][url]) || this.routes["default"];

      handler(req, res);
    });
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  on(event, callback) {
    this.server.on(event, callback);
  }
}
