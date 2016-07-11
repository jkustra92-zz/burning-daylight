//==============
// requirements
//==============
var express = require("express");
router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');
var spotify = new SpotifyWebApi();

router.get("/", function(req, res){
  spotify.searchPlaylists('dark').then(function(data, err) {
    var response = data.body.playlists.items;                 //so i seem to only have access to 20 playlists of the ones i get back, which kinda sucks. but we'll work with it.
    // res.send(data.body)
    // console.log(data.body.playlists.items.length)
    var playlistValue = Math.floor(Math.random() * response.length-1); //get a random number between 0 and 19 (but writing it this way for modularity and stuff)   
    var playlistUrl = response[playlistValue].external_urls.spotify;               
    // console.log(playlist);
    var playlist = playlistUrl.slice(23, playlistUrl.length-1)        //to get the url for the embedded player, i need to get the
    // console.log(playlist)
    res.send(playlist);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})

module.exports = router