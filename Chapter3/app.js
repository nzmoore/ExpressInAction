var express = require("express");
var http = require("http");
var path = require("path");

var app = express();

var publicPath = path.resolve(__dirname, "public");
console.log(publicPath);
app.use(express.static(publicPath));

app.use(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain" });
    response.end("Did you find a static file");
})

http.createServer(app).listen(3000);
