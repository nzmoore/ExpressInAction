var express = require("express");
var http = require("http");
var logger = require("morgan");

var app = express();

app.use(logger("short"));

app.use(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain" });
    response.end("Hi there again with Morgan logging");
})

http.createServer(app).listen(3000);
