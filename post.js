(function(){
  console.log("posting some data");

  $.ajax({
    url:"http://localhost:8080/index" + "/something",
    method: "POST",
    data:"posting some data"
  });

})();
