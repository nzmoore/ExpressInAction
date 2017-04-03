var express = require("express");
var http = require("http");
var path = require("path");
var reqLogger = require("morgan");

var app = express();

app.use(reqLogger("short"));

var publicPath = path.resolve(__dirname, "public");
console.log(publicPath);
app.use(express.static(publicPath));

app.get("/", function (request, response) {
    response.end("Welcome to the home page");
});

app.get("/about", function (request, response) {
    response.end("Whats it all about");
});

app.get("/weather", function (request, response) {
    response.end("You always take the weather with you");
});

app.use(function (request, response) {
    response.statusCode = 404;
    response.end("Page not found");
});


http.createServer(app).listen(3000);
