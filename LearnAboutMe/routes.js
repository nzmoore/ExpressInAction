var express = require("express");
var User = require("./models/user");
console.log("Routes entered");
var router = express.Router();
console.log("Router created");

router.use( function  (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  console.log("Flash errors " + req.flash("error"));
  res.locals.infos = req.flash("info");
  console.log("Setting locals");
  console.log(" User is " + res.locals.currentUser);
  next();
});

var passport = require("passport");

router.get("/", function(req, res, next) {
  console.log("/ route");

  User.find()
  .sort ({ createdAt: "descending"})
  .exec (function  (err, users) {
    if (err) { return next(err); }
    res.render("index", { users: users });
  });
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.get("/users/:username", function (req, res, next) {
  User.findOne({username: req.params.username}, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(404);
    }
    res.render("profile", {user: user});
  });
});

router.post("/signup", function (req, res, next) {
  console.log("Post for signup");
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function (err,user) {
    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists" );
      return res.redirect("/signup");
    }

    console.log("No user found");

    var newUser = new User({
      username: username,
      password: password
    });
    console.log("User began");
    newUser.save(next);
  });
}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failurePath: true
}));


module.exports = router;
