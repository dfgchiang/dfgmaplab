const http = require('http');
var url = require('url');
var os = require('os');
var hostname = os.hostname();

const server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");
});

const port = process.env.PORT || 1337;
server.listen(port);

function geturl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host')
    });
}//NOT USED

console.log("Server running at //" + hostname + ':' + port);
//http://localhost:%d", port);--BAD EXAMPLE FROM MSAZURE
