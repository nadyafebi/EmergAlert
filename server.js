/*
  Modules
*/
const express = require('express');
const path = require('path');

/*
  Express Setup
*/
const app = express();
app.use(express.static('web'));
app.listen(3000, function() {
  console.log('Server is running. Access using localhost:3000.');
});

/*
  Logger
*/
var logger = function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}
app.use(logger);

/*
  Routes
*/
function html(page) {
  return path.join(__dirname, 'web', page + '.html')
}

app.get('/', function(req, res) {
  res.sendFile(html('index'));
});

app.get('/test', function(req, res) {
  res.sendFile(html('test'));
});
