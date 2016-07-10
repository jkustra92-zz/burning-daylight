//==============
// requirements
//==============

var express = require("express");
var app = express();
var logger = require("morgan");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;

//============
// middleware
//============

app.use(logger("dev"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//=============
// controllers
//=============

var watsonController = require("./controllers/watson.js")
app.use("/watson", watsonController);

var musicController = require("./controllers/music.js")
app.use("/music", musicController);

var quotesController = require("./controllers/quotes.js")
app.use("/quotes", quotesController);

var factsController = require("./controllers/facts.js")
app.use("/facts", factsController);

//========
// static
//========

app.use(express.static("public"));

//===========
// listening 
//===========

app.listen(port);
console.log("=======")
console.log("(⊙︿⊙✿)");
console.log("=======")