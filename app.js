/*
var _express = require('express');
var _app = _express();
var _url = require('url');
var _path = require('path');
var _fs = require('fs');
var _mime = require('mime');
var _config = require('./config');

//The world's most advanced web server code...BEHOLD!
_app.get('/*', function(req, res){       
    var uri = _url.parse(req.url).pathname;             
    var filename = _path.join(process.cwd(), uri);         
    _fs.exists(filename, function(exists){
        if(!exists){        
            res.writeHead(404, {'Content-Type' : 'text/plain'});        
            res.write('Content not found');        
            res.end();        
            return;
        } 
        _fs.readFile(filename, 'binary', function(err, file){                
            res.writeHead(200, {'Content-Type' : _mime.lookup(filename) });        
            res.write(file, 'binary');        
            res.end();
        });          
    }); 
});

_app.listen(_config.info.port);

console.log('listening at ' + _config.info.port);
*/
var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.sendfile('index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});