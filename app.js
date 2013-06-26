//The world's most advanced web server code...BEHOLD!

var express = require('express');
var app = express();
app.use(express.logger());
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/media'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});