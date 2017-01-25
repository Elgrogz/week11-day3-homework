var albums = null;

var makeRequest =function(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
}

var populateList = function(albumsToPrint) {
  var list = document.querySelector('#albums');
  list.innerText = "";
  albumsToPrint.forEach(function(album) {
    var p = document.createElement('p');
    p.innerText = "Album title: " + album.name + "\nArtist Name: " + album.artists[0].name + "\nAlbum Type: " + album.album_type;
    list.appendChild(p);
  });
}

var getAlbumsByArtist = function() {
  var filteredAlbums = albums.filter(function (album) {
    console.log(this.value);
    return (album.artists[0].name === this.value);
  }.bind(this));
  console.log(filteredAlbums);
  populateList(filteredAlbums);
}

var requestComplete = function() {
  if (this.status != 200) return;
  var jsonString = this.responseText;
  var data = JSON.parse(jsonString);
  albums = data.albums.items;
  populateList(albums);
}

var app = function(){
  var url = 'https://api.spotify.com/v1/search?q=christmas&type=album';
  makeRequest(url, requestComplete);

  var searchQuery = document.querySelector('#search');
  searchQuery.onclick = getAlbumsByArtist;
}

window.onload = app;