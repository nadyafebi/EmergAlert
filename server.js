/*
  Modules
*/

const express = require('express');
const path = require('path');
require('dotenv').config();
var request = require('request');
var twilio = require('twilio');

var accountSid = process.env.ACCOUNTSID; // Your Account SID from www.twilio.com/console
var authToken = process.env.AUTHTOKEN;   // Your Auth Token from www.twilio.com/console

var client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

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

app.post('/alert', function(req, res) {
  console.log("Alert detected");
  res.end();

  request('https://api.mlab.com/api/1/databases/athenahacks/collections/students?apiKey='+process.env.API_KEY, { json: true }, (err, res, main) => {
    if (err) { return console.log(err); }
    console.log(main.length + " Success!") ;
    for(var i = 0; i < main.length; i++){
      client.messages.create({
          body: "This is an alert!! not really this is Diane testing. there is a shooting going on in the school. Stay safe.\n PS: Not sorry for disturbing.",
          to: main[i]["phoneNumber"],  // Text this number
          from: process.env.SENDERNUM // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
  }
  })
})
