/*****************************************************************/
/******** SPEECH RECOGNITION SETUP YOU CAN IGNORE ****************/
/*****************************************************************/
try {
  var debouncedProcessSpeech = _.debounce(processSpeech, 500);
} catch (e) {
  console.log(`debouncedProcessSpeech | ${e}`);
  window.alert("Speech proccessing loading... Please reload the page.");
  window.location.reload();
}

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onresult = function(event) {
  // Build the interim transcript, so we can process speech faster
  var transcript = '';
  var hasFinal = false;
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal)
      hasFinal = true;
    else
      transcript += event.results[i][0].transcript;
  }

  if (DEBUGSPEECH) {
    if (hasFinal)
      otherFeedback.setContent(" ");
    else
      otherFeedback.setContent(" " + transcript);
  }

  var processed = debouncedProcessSpeech(transcript);

  // If we reacted to speech, kill recognition and restart
  if (processed) {
    recognition.stop();
  }
};
// Restart recognition if it has stopped
recognition.onend = function(event) {
  setTimeout(function() {
    if (DEBUGSPEECH)
      otherFeedback.setContent(" ");
    recognition.start();
  }, 1000);
};
recognition.start();
/*****************************************************************/
/******** END OF SPEECH RECOG SETUP ******************************/
/*****************************************************************/
