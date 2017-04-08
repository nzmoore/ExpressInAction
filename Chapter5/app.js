var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");

var app = express();
var weather = new ForecastIo("20ef0b6dbc874d0cc1091d277f0cd569");

var staticPath = path.resolve(__dirname, "public");
var views = path.resolve(__dirname, "views");

app.use(express.static(staticPath));

app.set("views", views);
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  console.log("Index Route matched");
  res.render("index");
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
  console.log("Zip Route matched");
  var zipcode = req.params[0];
  console.log("Zip code is " + zipcode );
  var location =zipdb.zipcode(zipcode);

  if (!location.zipcode) {
    console.log("No location found");
    next();
    return;
  }

  var latitude = location.latitude;
  var longitude = location.longitude;

  weather.forecast(latitude, longitude, function(err, data){
    if (err) {
      console.log("Forecast error " + err);
      next();
      return;
    }
     console.log("Temp is " + data.currently.temperature);

    res.json({
      zipcode: zipcode,
      temperature: data.currently.temperature
    });
  });
});

app.use(function(req, res){
  res.status(404).render("404");
});

app.listen(3000);
