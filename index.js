const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");
});

const port = process.env.PORT || 1337;
server.listen(port);

const locotorp = window.location.protocol;
const host = window.location.hostname;

console.log("Server running at http://localhost:%d", port);
