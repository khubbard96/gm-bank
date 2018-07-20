const a_token = "2bZngeBs5EhhOwUoK1BaoBdtsBlDIbj3Mt2UGuUJ";
const me_id = "13902754";

const gm_api = require("groupme").Stateless;
const http = require("http");
const https = require("https");
const querystring = require("querystring");
const director = require("director");
const _ = require("underscore");
const call_command = "bank";


var postData = {
  "bot_id": "1a9e83c8c3ef13416e6b8ab00c",
  "text": payload
};

var bot_id = "";
//var request = require("request");

var bot_ids = {};



function check_bank(id){
  console.log(this.req.chunks);
  var chunk = JSON.parse(this.req.chunks[0]);
  var commands = chunk.text.split[" "];
  if(commands[0] != call_command) return;
  var sender = chunk.user_id;
  var bot_message = chunk.sender_type == "bot";
  var group = chunk.group_id;

  var mentions = _.find(chunk.attachments, function(a){
    return a.type == "mentions";
  });
  var mentioned_ids = mentions ? mentions.user_ids || [];

  if(!bot_message) bot_respond(id, message + " " + sender);

  bank[commands[1]](mentioned_ids);

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


//bank command handler
var bank = {
  balance_info: function(name, balance){
    this.name = name;
    this.balance = balance;
  }
  balance: function(mentioned){
    var all_info = [];
    _.each(mentioned,function(user){

      all_info.push(new bank.balance_info(user_name, user_balance));
    });
    return all_info;c
  },

}






/*UNDER THE HOOD STUFF - Server, POST requests, etc*/

//router for requests
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
//basic server obj
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

//causes the bot to respond in the group
function make_request(requestData, requestOptions){
  if(!requestData || !requestOptions){
    return false;
  }
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
    req.end();
    return false;
  });
  req.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
    req.end();
    return false;
  });
  req.end(JSON.stringify(postData));
  return true;
}
