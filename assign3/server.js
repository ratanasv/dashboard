var express = require('express');
var http = require('http');
var app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/app'));

http.createServer(app).listen(8080);