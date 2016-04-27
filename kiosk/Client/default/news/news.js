function doGet() {
$.ajax({
  url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=" + encodeURIComponent("http://rss.cnn.com/rss/cnn_topstories.rss"),
  dataType: "jsonp",
  success: function(data) {
	var entries = data['responseData']['feed']['entries'];
	document.write('<head><link rel="stylesheet" href="news.css"/><script src="jquery.js"></script></head>');
	document.write('<div style="background-color:#990000;top:0%;left:0%;position:fixed;width:100%;text-align:center;"><h2>CNN News Live</h2></div>');
	document.writeln("<br/>", "<br/>", "<br/>", "<br/>");
	for (i = 0; i < entries.length; i++) {
		var  title = data['responseData']['feed']['entries'][i]['title'];
		var content = data['responseData']['feed']['entries'][i]['contentSnippet'];
		var test = data['responseData']['feed']['entries'][i]['mediaGroups'];
		if (typeof test != "undefined") {
			var thumb = data['responseData']['feed']['entries'][i]['mediaGroups'][0]['contents'][0]['url'];
		}
		else {
			var thumb = null;
		}
		document.write('<div id="news_' + i + '" class="news"><table><tr><th class="headline">');
		document.write(title);
		document.write("</th>");
		if (thumb != null){document.write('<td rowspan="2"><img src="' + thumb + '"></img></td>');}
		document.write('</tr><tr><td class="content">');
		document.write(content);
		document.write("</td></tr></table>");
		document.writeln("<br/>", "<hr>", "<br/>", "<br/>", "</div>");
		
	}	
	run();
	setInterval(run, 40050);
  }
})
}


function run() {
var timerId = 0;
var i = 0;
window.scroll(0, 0);
timerId = setInterval(function() {
var div = document.getElementById("news_" + i);
var dist = div.offsetHeight;
window.scrollBy(0, dist);
i++
//break
if (i >= 8){
clearInterval(timerId);
}
}, 5000);
}

$(document).ready(function() {
setInterval(doGet(), 120000);
})


/*
extra stuff:
$.get("http://rss.cnn.com/rss/cnn_topstories.rss", function (data) {
    $(data).find("entry").each(function () { // or "item" or whatever suits your feed
        var el = $(this);

        console.log("------------------------");
        console.log("title      : " + el.find("title").text());
        console.log("author     : " + el.find("author").text());
        console.log("description: " + el.find("description").text());
    });
});
*/
