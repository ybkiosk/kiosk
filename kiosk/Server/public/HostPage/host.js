$("document").ready(function(){
localStorage.setItem("i", "1");
$("#file").hide();
$("#web").click(function(){
	$("#local").attr('checked',false);
	$("#utube").attr('checked', false);
	$("#file").val("");
	$("#source").show();
	$("#file").hide();
	$("#source").attr('placeholder', "Enter Web Address");
});
$("#local").click(function(){
	$("#web").attr('checked',false);
	$("#utube").attr('checked', false);
	$("#source").val("");
	$("#file").show();
	$("#source").hide();
});
$("#utube").click(function(){
	$("#web").attr('checked', false);
	$("#local").attr('checked', false);
	$("#file").val("");
	$("#file").hide();
	$("#source").show();
});
$("#source").change(function() {
if($("#utube").is(':checked') == true) {
$("#search_results").html("");
	var request = gapi.client.youtube.search.list({
		part: 'snippet',
		type: "video",
		q: $("#source").val(),
		maxResults: 4,
		order: "date",
	});
	request.execute(function(response) {
		console.log(response) //*for debugging
		$.each(response.result.items, function(index, item) {
		  $.get("snippet.html", function(e) {
			var htmlChild = tplawesome(e, [{
			  "title":item['snippet']['title'],
			  "up_by":item['snippet']['channelTitle'],
			  "up_at":item['snippet']['publishedAt'],
			  "thumb":item['snippet']['thumbnails']['default']['url'],
			  "v_id":item['id']['videoId'],
			}]);
			$("#search_results").append(htmlChild);
			console.log(item.id.videoId);
		  });
		});
	});
}
});
$("#launch").click(function() {
var time = $("#date0").val() + "  " + $("#time0").val();
console.log($("#local"));
if (time == 0) {
	alert("Please enter a Date and Time!");
}
//Check this!
else if ($("#source").val() == 0 && $("#file").val() == 0) {
	alert("Please enter a source address!");
}
else{	
	var x = window.confirm("are you sure that you would like to launch this bradcast on:  " + time + " CST(UTC-6:00)?");
	if (x==false) {
		alert("page aborted!");
		location.reload();
	}
	else if (x==true) {
		$("#hidden").val(localStorage.getItem("i"));
		$("form").submit();
	}
}
});
$("#today").click(function(){
	var d = new Date();
	var month = ("0" + (d.getMonth() + 1)).slice(-2)
	var date = ("0" + d.getDate()).slice(-2)
	var date = d.getFullYear() + "-" + month + "-" + date
	var hours = ("0" + d.getHours()).slice(-2)
	var minutes = ("0" + d.getMinutes()).slice(-2)
	$("#date0").val(date);
	$("#time0").val(hours + ":" + minutes)
});
$("#new_time").click(function() {
	var parent = $("#clone").clone();
	var child = parent.children();
	//console.log(child);
	var i = localStorage.getItem("i");
	parent.attr("id", parent.attr("id") + i);
	parent.attr("style", "visibility:visible;");
	var parent1 = $.each(child, function(index, element) { 
		var i = localStorage.getItem("i");
		$(element).attr("name", $(element).attr("name") + i);
		$(element).attr("id", $(element).attr("id") + i);
		return ( $(element) !== '[type*="button"]')
	});
	$(parent).append(parent1);
	$("#launch_time").append(parent);
	var i = parseInt(localStorage.getItem("i"));
	localStorage.setItem("i", i+1);
});



});

function onClientLoad() {
	gapi.client.load('youtube', 'v3', apiReady);
}

function apiReady() {
	console.log("gapi loaded");
	gapi.client.setApiKey('AIzaSyD5h72bapjZ8XBNdJB7lln5QX8lG28Mt_g');
}

function selectVid(e) {
$(".item").css("border", "2px solid black");
$("#source").val("");
e.style.border="2px solid red";
$("#source").val("https://www.youtube.com/watch?v=" + e.id);
}
