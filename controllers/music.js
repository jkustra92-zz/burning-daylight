//==============
// requirements
//==============
var express = require("express");
router = express.Router();
var spotify = require('spotify');


router.get("/", function(req, res){
  spotify.search({ type: 'playlist', query: 'anger' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }else{
      console.log(data);
    }
  });
})

module.exports = router