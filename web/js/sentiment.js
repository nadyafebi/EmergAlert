var new_sentiment = 0;
var new_pos_senti = 89;
var new_neg_senti = 111;
var scoreRaw = 0;

console.log('check if this is working');

var sentence = '';
var currentText = '';
var runningInput = '';

var currentId = 1;

var params = {
    // Request parameters
};

var allData = {
  data: [] //{time: '', text: '', sentiment: '', keywords: ''}
};

document.addEventListener(
  'keypress',
  function (ev) {
  	if(ev.key.length == 1)
   		runningInput += ev.key;
   	if(!updateSentence(runningInput, '.', false)){
      if(!updateSentence(runningInput, '!', false)){
        updateSentence(runningInput, '?', false);
      }
    }
  },
  true
);

document.onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      updateSentence(runningInput, '.', true);
      document.getElementById("text-input-box").value = "";

      document.getElementById("display-sentiment").innerHTML = calcSentiment();
      return false;
    }
}

function calcSentiment() {
  new_sentiment = normalizeScore(scoreRaw);
  console.log('new sentiment: ', new_sentiment);
  return new_sentiment.toFixed(3);
}

function updateSentence(val, delim, override){
	var index = val.lastIndexOf(delim);

	var secondlastIndex = index != -1
							? val.substr(0, val.length - 1).lastIndexOf(delim)
							: -1;

	currentText = '';

	if(val.substr(val.length - 1) == delim || override){

		if(secondlastIndex != -1)
			currentText = val.substr(secondlastIndex + 1);
		else
			currentText = val;

		console.log('currentText: ', currentText)
		sentence += currentText + ' ';

    getSentiment(currentText, setStorage);

		currentText = '';

    return true;
	}
  return false;
}

function getSentiment(currentText, callback){

  var data = {
    documents: [{id: currentId++, text: currentText}]
  };

  var dataJSON = JSON.stringify(data);

  $.ajax({
      url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + $.param(params),
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","781dc59369fa42b5ab596a21dddfbcac");
      },
      type: "POST",
      // Request body
      data: dataJSON,
  })
  .done(function(data) {
      getKeyWords(currentText, callback, data);
  });
}

function getKeyWords(currentText, callback, dataSoFar){
  var data = {
    documents: [{id: currentId, text: currentText}]
  };

  var dataJSON = JSON.stringify(data);
  $.ajax({
      url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases?" + $.param(params),
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","781dc59369fa42b5ab596a21dddfbcac");
      },
      type: "POST",
      // Request body
      data: dataJSON,
  })
  .done(function(data) {
    var keyPhrases = data.documents[0].keyPhrases;
    callback(currentText, keyPhrases, dataSoFar);
  });
}

function setStorage(currentText, keyPhrases, data){
  scoreRaw = data.documents[0].score;
  console.log('scoreRaw', scoreRaw);

  normalizeScore(scoreRaw);
}

function normalizeScore(score) {
  if (score > 0.5) {
    score = score - 0.5;
    new_pos_senti = 200*score;
    console.log('positive score: ', new_pos_senti);
    return score + 0.5;
  } else {
    score = score + 0.5;
    new_neg_senti = 200*score;
    console.log('negative score: ', new_neg_senti);
    return score - 0.5;
  }
}


