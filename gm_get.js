const a_token = "2bZngeBs5EhhOwUoK1BaoBdtsBlDIbj3Mt2UGuUJ";
const gm_api = require("groupme").Stateless;
const dp_group_id = 13347275;
const test_group_id = 27144950;
const _ = require("underscore");
const fs = require('fs');


//groupme stuff

gm_api.Groups.show(a_token, dp_group_id, function(err,ret){
  var user_ids = _.pluck(ret.members, 'user_id');
  /*console.log(typeof ret);
  console.log(typeof ret.members);
  var members = Array.parse(ret.members);
  console.log(members);*/
  console.log(ret);
});
fs.readFile('stats.json', (err, content) => {
  var stats = JSON.parse(content);
  var message_ids = _.pluck(stats,'')
});
