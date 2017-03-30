var http = require("http");

function requestHandler(request, response) {
  console.log("Incoming request to " + request.url);
  response.end("Hi there suckers");
}

var server = http.createServer(requestHandler);

server.listen(3000);
