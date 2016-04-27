$("document").ready(function(){
loop();
});

function loop(){
var loop = setInterval(update, 30000);
localStorage.setItem("loopid", loop);
}

function update(){
console.log("updating");
$.ajax({
  url : "http://localhost/public/HostPage/switches.json",
  jsonpCallback : 'jsonCallback',
  dataType: "jsonp",
  success: function(data){
  //console.log("success");
  var time = data['time'];
  console.log(time);
	var d = new Date();
	var month = ("0" + (d.getMonth() + 1)).slice(-2)
	var date = ("0" + d.getDate()).slice(-2)
	var hours = ("0" + d.getHours()).slice(-2)
	var minutes = ("0" + d.getMinutes()).slice(-2)
	var minutes2 = ("0" + (minutes - 1)).slice(-2)
	var time2 = d.getFullYear() + "-" + month + "-" + date + hours + ":" + minutes;
	var time3 = d.getFullYear() + "-" + month + "-" + date + hours + ":" + minutes2;
  	//console.log(time);
	//console.log(time2);
	//console.log(time3);
  /* old codeif (time == time2){
	//alert("time");
	document.getElementById("mode").src="broadcast/template.html";
	playing();
  }
  else if (time == time3) {
	//alert("time2");
	document.getElementById("mode").src="broadcast/template.html";
	playing();
  }
*/
    $.each(time, function(i, e) {
	console.log(time2);
	console.log(e);
	if ( e == time2 ) {
		playing();
	}
	else if ( e == time3 ) {
		playing();
	}
    });
  }
  })
}

function playing() {
  document.getElementById("mode").src="broadcast/template.html";
  clearInterval(localStorage.getItem("loopid"));
  localStorage.setItem("stat", "playing");
  var id = setInterval(function(){handler(id);}, 600);
}

function handler(id) {
    var stat = localStorage.getItem("stat");
    if (stat == "completed") {
  	$("#mode").attr("src", "http://localhost/kiosk/Client/main.html");
	clearInterval(id);
	loop();
    }
}
