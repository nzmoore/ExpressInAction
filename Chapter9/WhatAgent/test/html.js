var app = require("../app");
var supertest = require("supertest");
var cheerio = require("cheerio");

describe("html response", function () {
  var request;
  beforeEach(function () {
    request = supertest(app)
      .get("/")
      .set("User-Agent", "my cool browser")
      .set ("Accept", "text/html");
  });

  it("returns an HTML response", function (done) {
    request
      .expect("Content-Type", /html/)
      .expect(200)
      .end(done);
  });

  it("returns my User Agent", function (done) {
    request
      .expect(function (res) {
        var htmlResponse = res.text;
        var $ = cheerio.load(htmlResponse);
        var userAgent = $(".user-agent").html().trim();
        if (userAgent != "my cool browser") {
          throw new Error("User Agent not found" + htmlResponse + "Agent is " + userAgent)
        }
      })
      .end(done);
  });

});
