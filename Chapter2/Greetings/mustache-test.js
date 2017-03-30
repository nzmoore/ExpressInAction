var Mustache = require("mustache");
// console.log(Mustache);
var result = Mustache.render("Hi, {{first}} {{last}}!", {
  first: "Nicholas",
  last: "Cage"
});
console.log(result + "1");
