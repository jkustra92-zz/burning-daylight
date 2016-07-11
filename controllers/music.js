//==============
// requirements
//==============
var express = require("express");
router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');
var spotify = new SpotifyWebApi();

router.get("/", function(req, res){
  console.log(req.query)
  var keyword = req.query.keyword
  spotify.searchPlaylists(keyword).then(function(data, err) {
    var response = data.body.playlists.items;                 //so i seem to only have access to 20 playlists of the ones i get back, which kinda sucks. but we'll work with it.
    console.log(data.body.playlists.items)
    console.log(data.body.playlists.items.length)
    var playlistValue = Math.floor(Math.random() * response.length-1); //get a random number between 0 and 19 (but writing it this way for modularity and stuff)   
    var playlistUrl = response[playlistValue].external_urls.spotify;
    var userId = response[playlistValue].uri
    console.log(userId)               
    // console.log(playlist);
    console.log(playlistUrl);
    var playlist = playlistUrl.slice(11, playlistUrl.length-1)
    var finalPlaylist = "https://embed.spotify.com/?uri=" + userId
    res.send(finalPlaylist);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})

module.exports = router