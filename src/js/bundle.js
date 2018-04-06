/*
Modules
*/
global.jQuery = require('jquery');
const $ = require('jquery');
const foundation = require('../../node_modules/foundation-sites/dist/js/foundation.js');
const vid = require('capture-video-frame');

$(document).foundation();

console.log("Started");

// Video Capture
$('#captureButton').click(function() {
  console.log("Click!");
  setInterval(function() {
    var frame = vid.captureVideoFrame('myvid', 'png');
    $('#myimg').attr('src', frame.dataUri);

    // Upload the image...
    var formData = new FormData();
    formData.append('file', frame.blob, 'my-screenshot.' + frame.format);

    postImage(frame.blob);
  }, 3000);
});

function postImage(img) {
  $(function() {
    $.ajax({
      url: "https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/1b2d3c17-e84b-4769-a621-a568c861c644/image/nostore?",
      beforeSend: function(xhrObj){
        // Request headers
        xhrObj.setRequestHeader("Content-Type","multipart/form-data");
        xhrObj.setRequestHeader("Prediction-key","1520f4222658422aa646244d79a66ef7");
      },
      type: "POST",
      processData: false,
      // Request body
      data: img,
    })
    .done(function(data) {
      console.log("success");
      var prob = data.Predictions[0].Probability;
      console.log(prob);
      $('#mydata').text(prob);
      if (prob > 0.9) {
        alert("SHOOTER DETECTED");
      }

    })
    .fail(function(data) {
      console.log("error");
      console.log(data);
    });
  });
}

// URI to Image Converter
function convertURIToImageData(URI) {
  return new Promise(function(resolve, reject) {
    if (URI == null) return reject();
    var canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    image = new Image();
    image.addEventListener('load', function() {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(context.getImageData(0, 0, canvas.width, canvas.height));
    }, false);
    image.src = URI;
  });
}
