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
    // res.send(data.body)
    // console.log(data.body.playlists.items.length)
    var playlistValue = Math.floor(Math.random() * response.length-1); //get a random number between 0 and 19 (but writing it this way for modularity and stuff)   
    var playlistUrl = response[playlistValue].external_urls.spotify;               
    // console.log(playlist);
    var playlist = playlistUrl.slice(24, playlistUrl.length-1)
    console.log(playlist)
    playlist2 = playlist.split("");
    for (var i = 0; i <playlist2.length; i++){
      if (playlist2[i] === "/"){                                    //to get the url for the embedded player, i need to remove the backslashes and replace them with colons. ugh. UGH. U G H.
        playlist2[i] = ":"
      }
    }
    finalPlaylist = "https://embed.spotify.com/?uri=spotify:" + playlist2.join("")
    console.log(finalPlaylist)      
    // console.log(playlist)
    res.send(finalPlaylist);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})

module.exports = router