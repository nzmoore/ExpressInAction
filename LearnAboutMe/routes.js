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

// router.get("/", function(req, res) {
//   res.send("Hi 6");
// });

router.get("/", function(req, res, next) {
  console.log("/ route");

  User.find()
  .sort ({ createdAt: "descending"})
  .exec (function  (err, users) {
    if (err) { return next(err); }
    res.render("index", { users: users });
  });
});

module.exports = router;
