var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");

var routes = require("./routes");

var app = express();



mongoose.connect("mongodb://localhost:27017/lam");

app.set("port", process.env.PORT || 3000);

var viewsDir = path.join(__dirname, "views");
console.log(viewsDir);
app.set("views", viewsDir);
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(session( {
  secret: "I promise you will never guess this",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

console.log("Before call to routes");
app.use(routes);
console.log("After call to routes");

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});
