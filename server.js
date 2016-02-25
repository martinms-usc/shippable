var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.get('*', function(req, res, next) {
  res.sendFile(__dirname + './public/index.html');
});

app.listen(8080);
console.log('app listening on port 8080');

module.exports = app;
