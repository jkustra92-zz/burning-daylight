//==============
// requirements
//==============
var express = require("express");
router = express.Router();
var request = require("request");

router.get("/", function(req, res){
  request("http://catfacts-api.appspot.com/api/facts?number=1", function(err, response, body){
    data = JSON.parse(body)
    fact = data.facts[0]
    res.send(data.facts[0])
  })
})

module.exports = router