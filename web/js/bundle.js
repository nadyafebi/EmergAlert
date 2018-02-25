/*
  Modules
*/
global.jQuery = require('jquery');
const $ = require('jquery');
const foundation = require('../../node_modules/foundation-sites/dist/js/foundation.js');
const vid = require('capture-video-frame');

$(document).foundation();

// Video Capture
$('#captureButton').click(function() {
  console.log("Capture!");
  var frame = vid.captureVideoFrame('myvid', 'png');
  $('#myimg').attr('src', frame.dataUri);
});
