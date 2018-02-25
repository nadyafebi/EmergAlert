/*
  Modules
*/

const express = require('express');
const path = require('path');
require('dotenv').config();
var request = require('request');
var mongoose = require('mongoose');

var uri = process.env.DB_URL;
mongoose.connect(uri);
var db = mongoose.connection;
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

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('MongoDB successfully  connected!');
});

request('https://api.mlab.com/api/1/databases/athenahacks/collections/messages?apiKey=o2gZ1lynVLWp2xf46oNSrA0avHlH5rUI', { json: true }, (err, res, main) => {

  if (err) { return console.log(err); }
  console.log(main.length);
  for(var i = 0; i < main.length; i++){
    console.log(main[i]["Message"]);
    
    // document.getElementById('h4Tag').innerHTML = main[i]["Message"];
    //$("#panel1").click(function(){
    //$("h4").append("<p>" + main[i]["Message"] + "</p>");
//});
}
});
