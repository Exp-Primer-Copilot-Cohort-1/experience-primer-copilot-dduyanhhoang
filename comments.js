// Create web server
// Create a web server that can respond to requests for / and /time. 
// Response for / should be the current time in ISO format: new Date().toISOString(). 
// Response for /time should be the UNIX epoch time in milliseconds (Date.now()). 
// Your server should listen on the port provided by the first argument to your program.

var http = require('http');

var server = http.createServer(function (req, res) {
    var url = require('url').parse(req.url, true);
    var path = url.pathname;
    var time = new Date(url.query.iso);
    var result;

    if (path === '/api/parsetime') {
        result = parsetime(time);
    } else if (path === '/api/unixtime') {
        result = unixtime(time);
    }

    if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    } else {
        res.writeHead(404);
        res.end();
    }

});

server.listen(Number(process.argv[2]));

function parsetime(time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    };
}

function unixtime(time) {
    return { unixtime: time.getTime() };
}