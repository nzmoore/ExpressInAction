var express = require("express");

var api = express.Router();

api.get("/timezone", function(req, res) {
  res.send("V2 Cool sample response for /timezone");
});

module.exports = api;
