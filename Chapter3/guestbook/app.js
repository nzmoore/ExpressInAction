var http = require("http");
var express = require("express");
var path = require("path");
var reqLogger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

var views = path.resolve(__dirname, "views");
console.log("Views dir is " + views);
app.set("views", views);
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;

app.use(reqLogger("dev"));

app.use(bodyParser.urlencoded({"extended": false}));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/new-entry", function(req, res) {
  res.render("new-entry");
});

app.post("/new-entry", function(req, res) {
  if (!req.body.title || !req.body.body) {
    res.status(400).send("Entries must have a title and a body");
    return;
  }
  console.log("Here is the req body body" + req.body.body);
  console.log("Here is the req body title" + req.body.title);
  entries.push({
    title: req.body.title,
    content: req.body.body,
    published: new Date()
  });
  console.log("entries" + JSON.stringify(entries));
  res.redirect("/");
});

app.use(function(req, res){
  res.status(404).render("404");
});

http.createServer(app).listen(3000, function() {
  console.log("Guestbook app listening on 3000");
});
