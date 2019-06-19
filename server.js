const http = require("http");
const app = require('./app');

const port = process.env.PORT || 5000;
const server = http.Server(app)

server.listen(port, function () {
    console.log("server run at port " + port);
});