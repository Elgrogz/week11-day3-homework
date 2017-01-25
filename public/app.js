var data = null;


//used to get data from a url. Request is created with new XMLHttpRequest, its given a type ('get' because its asking for data) and url to go to. 
var makeRequest =function(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
}

var populateList = function(albums) {
  var albumList = document.querySelector('#albums');

  albums.forEach(function(album) {
    var p = document.createElement('p');
    p.innerText = "Album title: " + album.name + "\nArtist Name: " + album.artists[0].name + "\nAlbum Type: " + album.album_type;
    albumList.appendChild(p);
  });
}

var requestComplete = function() {
  if (this.status != 200) return;
  var jsonString = this.responseText;
  data = JSON.parse(jsonString);
  var albums = data.albums.items;
  console.log(albums);
  populateList(albums);
}




var app = function(){
  var url = 'https://api.spotify.com/v1/search?q=christmas&type=album';
  makeRequest(url, requestComplete);

  console.log(data);

  var searchQuery = document.querySelector('#search-query');
  searchQuery.onclick(showAlbums);
}

window.onload = app;