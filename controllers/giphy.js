//==============
// requirements
//==============

var express = require("express");
router = express.Router();
var giphy = require('giphy-api')();

router.get("/", function(req, res){
  giphy.random("cute animal", function(err, data) {
    res.send(data)
  });
});

module.exports = router