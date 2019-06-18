var http = require('http');
var fs = require('fs');
var path = require('path');
var os = require('os');
var hostname = os.hostname();
const port = process.env.PORT || 8123;
const https = require('https');
const collars = {
    18461: "68C9B8A4BAD4EC91BA2E6582DFC6E5B5D2EFEAF18DA697AD6ED87DA8CD6179B36F420223714105432FD39CC11EF71511EA486D1669B2E7DF3398A2B30850E619AECA40B1A8C614CED47B66F8DEF6DC324816DE62F06F46114CF66B9D857F2801D3A12AF37E157ACB60D9C5E4868A1D0E8304AFDA39D64FD9DB24A156852BEDDBE27782091E3973B4D59F6D79E2B0F0471038D2C45C763A50454FCD4F664CB6F44F2D8BA71BA9FEF2BF182ECF8E57623B4F4CA019BBA813924474F6423C481E6A791AE37C43C36E920FDEC90B3F65CDCB647BC92A0476081846141E3F155C87970B04DF4E83060CB9D98840EA50C3D42BF1B51769E72F163ED89FA055B302C24E"
}
var qurl = 'https://wombat.vectronic-wildlife.com:9443/v2/collar/COLLARID/gps?collarkey=';
http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }
    if (request.url.indexOf('collarid=') > 0) {
        var id = parseInt(request.url.split('collarid=')[1]);
        if (collars[id] !== undefined) {
            var token = collars[id];
            var arg2 = '&afterAcquisition=2019-06-17T12:34:56';
            qurl = qurl.replace('COLLARID', id) + token + arg2;
            https.get(qurl, (resp) => {
              let data = '';
              // A chunk of data has been recieved.
              resp.on('data', (chunk) => {
                data += chunk;
              });
              // The whole response has been received. Print out the result.
              resp.on('end', () => {
                  var atime = JSON.parse(data)[0].acquisitionTime;
                  var longitude = JSON.parse(data)[0].longitude;
                  var latitude = JSON.parse(data)[0].latitude
                  console.log(atime);
                  console.log(longitude);
                  console.log(latitude);
                  filePath = './index.html?lon=' + longitude + '&lat=' + latitude;
              });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        }
    }
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(port);
console.log('Server running at http://' + hostname + ':' + port);
