
// SPEECH SYNTHESIS SETUP
var voicesReady = false;
window.speechSynthesis.onvoiceschanged = function() {
  voicesReady = true;
  // Uncomment to see a list of voices
  // console.log("Choose a voice:\n" + window.speechSynthesis.getVoices().map(function(v,i) { return i + ": " + v.name; }).join("\n"));
};

var generateSpeech = function(message, callback) {
  if (voicesReady) {
    var msg = new SpeechSynthesisUtterance();
    msg.voice = window.speechSynthesis.getVoices()[VOICEINDEX];
    msg.text = message;
    msg.rate = 0.2;
    if (typeof callback !== "undefined")
      msg.onend = callback;
    speechSynthesis.speak(msg);
  }
};
//
// getIntersectingTile(screenPosition)
//    Returns the tile enclosing the input screen position
// Input:
//    screenPosition = [x,y]
// Output:
//    tilePosition = {row: r, col: c}, if intersecting the board
//    false, if not intersecting the board
var getIntersectingTile = function(screenPosition) {
  if (screenPosition[0] >= gridOrigin[0] && screenPosition[0] <= gridOrigin[0] + BOARDSIZE
    && screenPosition[1] >= gridOrigin[1] && screenPosition[1] <= gridOrigin[1] + BOARDSIZE) {
    var column = Math.floor((screenPosition[0] - gridOrigin[0]) / TILESIZE);
    var row = Math.floor((screenPosition[1] - gridOrigin[1]) / TILESIZE);
    var tile = tiles[row*NUMTILES + column];
    return {row: row, col: column};
  }
  else {
    return false;
  }
};
