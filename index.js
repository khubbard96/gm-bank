const a_token = "2bZngeBs5EhhOwUoK1BaoBdtsBlDIbj3Mt2UGuUJ";
const me_id = "";
//var dp_group_id = 13347275;
//var test_group_id = 27144950;
var gm_api = require("groupme").Stateless;
var http = require("http");
var https = require("https");
var querystring = require("querystring");
var director = require("director");
var _ = require("underscore");
var bot_id = "";
//var request = require("request");

var bot_ids = {};

var router = new director.http.Router({
  '/'    : {
    get: ping,
  },
  '/index/:param': {
    get: index,
    post: log
  },
  '/bank':{
    post:check_bank,
  },
  '/request/:id':{
    post:check_bank,
  }
});

function check_bank(id){
  var chunk = JSON.parse(this.req.chunks[0]);
  var message = chunk.text;
  var commands = [];
  var sender = chunk.user_id;
  //var message = this.req.chunks[0].text;
  //var message = this.req.chunks["text"];//groupme v3 message object
  //var sender = this.req.chunks[0]["user_id"];
  //var commands = message.split(" ");
  /*switch(command[0]){
    case "balance":

      break;
    case ""
  }*/
  //console.log(message);
  bot_respond(id, message + " " + sender);

}






function ping(){
  this.res.writeHead(200);
  this.res.end("robots");
}
function index(){
  this.res.writeHead(200);
  this.res.end("this is a new page");
}
function log(param){
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

//groupme stuff

gm_api.Groups.index(a_token, function(err,ret){
  //console.log(ret);
});




function bot_respond(id,payload){
  var postData = {
    "bot_id": "1a9e83c8c3ef13416e6b8ab00c",
    "text": payload
  };
  var options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST',
  };
  var req = https.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  // write data to request body
  //req.write(postData);


  req.end(JSON.stringify(postData));
}
//bot_respond("1a9e83c8c3ef13416e6b8ab00c","hello world");
