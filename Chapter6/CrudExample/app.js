var express = require("express");

var app = express();

app.get("/", function(req, res) {
  res.send("Get request received ");
});

app.post("/", function(req, res) {
  res.send("Now we have a post ")
});

app.put("/", function(req, res) {
  res.send("And this is a put ");
});

app.delete("/", function(req, res) {
  res.send("Last but not least we can delete ")
});

app.listen(3000);
