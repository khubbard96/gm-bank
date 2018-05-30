var Ajax = require("simple-ajax");

console.log("Posting");

var test_post = new Ajax({
  url:"http://localhost:3000",
  method:"POST",
  data:{"info":"Hello Server"},
});
test_post.on("success",function(event){
  console.log("success ",event);
});
