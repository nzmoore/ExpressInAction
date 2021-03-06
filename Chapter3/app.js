var express = require("express");
var http = require("http");
var path = require("path");
var reqLogger = require("morgan");

var app = express();

app.use(reqLogger("short"));

var publicPath = path.resolve(__dirname, "public");
//console.log(publicPath);
app.use(express.static(publicPath));

var viewDir = path.resolve(__dirname, "views");
app.set("views", viewDir);
app.set("view engine", "ejs");

app.get("/", function (request, response) {
    response.end("Welcome to the home page");
});

app.get("/about", function (request, response) {
    response.end("Whats it all about");
});

app.get("/ejs", function (request, response) {
    response.render("index", {
      message: "Seeing is believing"
    });
});

app.get("/weather", function (request, response) {
    response.end("You always take the weather with you");
});

app.get("/hello/:who", function (request, response) {
    response.end("Hello there " + request.params.who + ".");
});

app.use(function (request, response) {
    response.statusCode = 404;
    response.end("Page not found");
});

http.createServer(app).listen(3000);
