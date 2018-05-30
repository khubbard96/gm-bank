var a_token = "";
var gm_api = require("groupme").Stateless;
var http = require("http");
var director = require("director");

var router = new director.http.Router({
  '/'    : {
    get: ping,
  },
});
function ping(){
  this.res.writeHead(200);
  this.res.end("robots");
}

var server = http.createServer(function (req, res) {
  req.chunks = [];

  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
    console.log(chunk)
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
}).listen(8080);
