//mongoDB setup
var mongoose = require('mongoose');
require('dotenv').config();

var uri = process.env.DB_URL;
mongoose.connect(uri);
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('MongoDB successfully  connected!');
});

request('https://api.mlab.com/api/1/databases/athenahacks/collections/students/phone?apiKey=o2gZ1lynVLWp2xf46oNSrA0avHlH5rUI', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});