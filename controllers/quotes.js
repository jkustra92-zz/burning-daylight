//==============
// requirements
//==============
var express = require("express");
router = express.Router();
var request = require("request")
var parseString = require('xml2js').parseString;                    //the response was in xml so i needed a way to convert it to json


router.get("/", function(req, res){
  request("http://api.forismatic.com/api/1.0/?method=getQuote&format=xml&lang=en", function(err, response, body) {
    console.log(body)
    // console.log(typeof body)
    // var data = JSON.parse(body);
    // console.log(typeof data);
    var xml = body
      parseString(xml, function (err, result) {
      var text = result.forismatic.quote[0].quoteText[0]
      var author = result.forismatic.quote[0].quoteAuthor[0]          
      var quote = {                                             //made my own object with the data i needed cause, no offense to forismatic, your naming conventions are ... strange.
        "text": text,
        "author": author
      }
      res.send(quote)
    });
  })
})
module.exports = router