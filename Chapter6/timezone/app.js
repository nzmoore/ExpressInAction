var express = require("express");
var apiV1 = require("./api1.js");
var apiV2 = require("./api2.js");

var app = express();
app.use("/v1", apiV1);
app.use("/v2", apiV2);

app.listen(3000, function(){
  console.log("Timezone API example started on 3000");
});
