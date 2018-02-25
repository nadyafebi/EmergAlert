/*
  Modules
*/
const express = require('express');

/*
  Express Setup
*/
const app = express();
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
app.get('/', function(req, res) {
  res.send('hello world');
});
