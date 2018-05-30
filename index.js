const a_token = "2bZngeBs5EhhOwUoK1BaoBdtsBlDIbj3Mt2UGuUJ";
const me_id = "";
//var dp_group_id = 13347275;
//var test_group_id = 27144950;
var gm_api = require("groupme").Stateless;
var http = require("http");
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

function check_bank(bot_id){
  var message = this.req.chunks["text"];//groupme v3 message object
  var sender = this.req.chunks["user_id"];
  var commands = message.split(" ");
  /*switch(command[0]){
    case "balance":

      break;
    case ""
  }*/

  bot_respond(bot_id, message + " " + sender);

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
  var chunk = this.req.chunks;
  console.log(param);
  console.log(chunk[0]);
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
  console.log(ret);
});




function bot_respond(id,payload){
  var url = "https://api.groupme.com/v3/bots/post"

  // Set up the request
  var post_data = querystring.stringify({
    'bot_id':id,
    'text':"hello world"
  })
  var post_options = {
      host: url,
      port: '',
      path: '',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
    });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
}
