$("document").ready(function(){
//console.log("js loaded");
});
function main_ready() {
var fetchid = setInterval(function(){fetch()}, 100000);
localStorage.setItem('fetchid', fetchid);
fetch();
}

function fetch(fetchid){
var ClientId = "91086916239-4h24il97ipuitm9ktt2qvvpjhmmd6dt2.apps.googleusercontent.com"
var Scopes = ['https://www.googleapis.com/auth/gmail.readonly'];
authorize(ClientId, Scopes);
function authorize(ClientId, Scopes){
console.log("attempting to authorize gmail api");
gapi.auth.authorize({
	'client_id': ClientId,
	'scope': Scopes,
	'immediate': true
  }, checkAuth);
}
function checkAuth(result){
if (!result.error) {
loadAPI();
console.log("working");
}
else {
console.log("authorization error");
//console.log(result);
}
}
function loadAPI(){
console.log("loading api");
gapi.client.load('gmail', 'v1', request);
}
function request(){
Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return "after:" + yyyy + "/" + (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]); // padding
  };

d = new Date();
var d = d.yyyymmdd();
//console.log(d);
var request = gapi.client.gmail.users.messages.list({
	'userId': "ybkiosk@gmail.com",
	'maxResults': 1,
	'q': d,
	'labelids': "Label_1",
});
request.execute(function(response){
console.log(response);
if (response['resultSizeEstimate'] = 1) {
  var messageid = response['result']['messages'][0]['id'];
  localStorage.setItem('messageid', messageid);
  get_message(messageid);
}
else if (!response) {
  document.write("error, could not find correct email");
}
else {
  console.log("unknown error connecting to email")
}
});
}

function get_message(messageid) {
  var request = gapi.client.gmail.users.messages.get({
	'userId': "ybkiosk@gmail.com",
	'id': messageid
  });
  request.execute(function(response){
	console.log(response);
	var attachId = response['result']['payload']['parts'][1]['body']['attachmentId'];
	console.log(attachId);
	get_attach(attachId);
  });
}

function get_attach(attachId) {
  console.log(attachId);
  console.log(messageid);
  var messageid = localStorage.getItem('messageid');
  var request = gapi.client.gmail.users.messages.attachments.get({
	'userId': "ybkiosk@gmail.com",
	'messageId': messageid,
	'id': attachId,
  });
  request.execute(function(response){
	console.log(response);
	if (response.data.length > 10) {
	  var data = response['result']['data'];
	  var data = data.replace(/-/g, '+').replace(/_/g, '/');
	  clearInterval(localStorage.getItem('fetchid'));
	  run(data)
	}
	else {
	  console.log("invalid data in response");
	}
  });

}
function run(data) {
console.log("completed");
  var i = 2
	$("#doc").attr("src", "data:application/pdf;base64," + data);

}


}

//base64.decode(bodyData.replace(/-/g, '+').replace(/_/g, '/'));
// + "#page=" + 

/*
function run(){

}
*/

/*
userId: ybkiosk@gmail.com
maxResults: 1
q after: yyy/mm/dd
labelids Label_1
*/
