var data = null;


//used to get data from a url. Request is created with new XMLHttpRequest, its given a type ('get' because its asking for data) and url to go to. 
var makeRequest =function(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
}

var requestComplete() {
  if (this.status != 200) return;
  var jsonString = this.responseText;
  data = JSON.parse(jsonString);

  populateList(data);
}




var app = function(){
  var url = 'https://api.spotify.com/v1/search?q=christmas&type=album';
  makeRequest(url, requestComplete);
}

window.onload = app;