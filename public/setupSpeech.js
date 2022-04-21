/*****************************************************************/
/******** SPEECH RECOGNITION SETUP YOU CAN IGNORE ****************/
/*****************************************************************/
var debouncedProcessSpeech = _.debounce(processSpeech, 500);

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
      otherFeedback.setContent("SPEECH DEBUG: ready");
    else
      otherFeedback.setContent("SPEECH DEBUG: " + transcript);
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
      otherFeedback.setContent("SPEECH DEBUG: ready");
    recognition.start();
  }, 1000);
};
recognition.start();
/*****************************************************************/
/******** END OF SPEECH RECOG SETUP ******************************/
/*****************************************************************/

import {laserToggle} from "./triggers";

console.log("Defining var processSpeech");
var processSpeech = function(transcript) {
    // Helper function to detect if any commands appear in a string
    var userSaid = function(str, commands) {
      for (var i = 0; i < commands.length; i++) {
        if (str.toLowerCase().indexOf(commands[i].toLowerCase()) > -1)
          return commands[i].toLowerCase();
      }
      return false;
    };

    console.log(`I heard ${transcript}`);
}