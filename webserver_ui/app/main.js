// GAME SETUP
var initialState = SKIPSETUP ? "presenting" : "setup";
var presentationState = new PresentationState({state: initialState});
var cursor = new Cursor();

// UI SETUP
setupUserInterface();

var usingGestures = true; // set to false if check gestureCheckbox, default is to recognize gestures
var usingSpeech = true; // set to false if check the speechCheckbox, default is on

//
// MAIN GAME LOOP
// Called every time the Leap provides a new frame of data
Leap.loop({enableGestures: true}, function(frame){
Leap.loop({ hand: function(hand) {

  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        let handType;
        var handIds = gesture.handIds;
        handIds.forEach(function(handId) {
          let handNow = frame.hand(handId);
          handType = handNow.type;
          // console.log(hand)
          console.log("hand: ", handNow.type)
        });

        switch (gesture.type){
          case "circle":
              console.log("Circle Gesture");
              // CircleGesture circle = new CircleGesture(gesture);
              var clockwise = false;
              var pointableID = gesture.pointableIds[0];
              var direction = frame.pointable(pointableID).direction;
              var dotProduct = Leap.vec3.dot(direction, gesture.normal);
              if (dotProduct  >  0) clockwise = true;

              if (clockwise){
                console.log("Clockwise Circle Gesture")
              } else {
                console.log("Counterclockwise Circle Gesture")
              }

              break;
          case "keyTap":
              console.log("Key Tap Gesture");
              break;
          case "screenTap":
              console.log("Screen Tap Gesture");
              break;
          case "swipe":
              console.log("Swipe Gesture");

              //Classify swipe as either horizontal or vertical
              var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
              //Classify as right-left or up-down
            let swipeDirection;
            if (isHorizontal) {
              if (gesture.direction[0] > 0) {
                swipeDirection = "right";
              } else {
                swipeDirection = "left";
              }
            } else { //vertical
              if (gesture.direction[1] > 0) {
                swipeDirection = "up";
              } else {
                swipeDirection = "down";
              }
            }
              console.log(swipeDirection)
              break;
        }
    });
  }

  // Moving the cursor with Leap data
  // Use the hand data to control the cursor's screen position
  var cursorPosition = [0, 0];
  var handPosition = hand.screenPosition();
  var x_offset = 100;;
  var y_offset = 300;
  cursorPosition[0] = (handPosition[0] + x_offset);
  cursorPosition[1] = (handPosition[1] + y_offset);

  cursor.setScreenPosition(cursorPosition);

  // console.log(presentationState);

  // // SETUP mode
  if (presentationState.get('state') == 'setup') {
    background.setContent("<h1>SmartSlides</h1><h3 style='color: #7CD3A2;'>start presentation</h3>");

  }
  //
  // // presenting or END GAME so draw the board and ships (if player's board)
  // // Note: Don't have to touch this code
  else {
    if (presentationState.get('state') == 'presenting') {
      background.setContent("<h1>SmartSlides</h1><h3 style='color: #7CD3A2;'>presenting.../h3>");


    }

    /// render the presentation

  }
}}).use('screenPosition', {scale: LEAPSCALE})});


// processSpeech(transcript)
//  Is called anytime speech is recognized by the Web Speech API
// Input:
//    transcript, a string of possibly multiple words that were recognized
// Output:
//    processed, a boolean indicating whether the system reacted to the speech or not
var processSpeech = function(transcript) {
  // Helper function to detect if any commands appear in a string
  var userSaid = function(str, commands) {
    for (var i = 0; i < commands.length; i++) {
      if (str.indexOf(commands[i]) > -1)
        return true;
    }
    return false;
  };

  var processed = false;

  if (presentationState.get('state') == 'setup') {
    console.log("I am recognizing speech and in setup mode");


    // Starting the presentation with speech
    // Detect the 'start' command, and start the game if it was said
    var said_start = userSaid(transcript, ["start"]); // start commmand is said
    if (said_start) {
      // probably do not want the computer to say this out loud haha
      // generateSpeech("New SmartSlides presentation started!");
      presentationState.startPresentation();

      /// get rid of all text and go to full screen (currently black full screen)
      console.log("I am here yay");
      startButton.setContent("");
      speechCheckbox.setContent("");
      gestureCheckbox.setContent("");
      background.setContent("");
      cursorModifier.setOpacity(0);

      if (DEBUGSPEECH) tile.setSize([1800, 800]); // use this if want to see the debug speech
      else tile.setSize([1800, 900]); // full screen
      tileTransformModifier.setTransform(Transform.translate(-250, -35));
      tile.setProperties({backgroundColor: "black"});
      processed = true;
    }
  }

  else if (presentationState.get('state') == 'presenting') {
    console.log("I am recognizing speech and in presenting mode");

    // not implementing transitioning slides right now
    var said_next_slide = userSaid(transcript.toLowerCase(), ["next slide"]);
    var said_prev_slide = userSaid(transcript.toLowerCase(), ["previous slide"]);

    // current speech recognition
    var said_create_circle = userSaid(transcript.toLowerCase(), ["create circle", "circle this"]);
    var said_highlight = userSaid(transcript.toLowerCase(), ["highlight this", "create highlight"]);
    var said_laser = userSaid(transcript.toLowerCase(), ["start laser pointer", "laser", "cursor", "laser pointer"]);

    if (said_create_circle) { // also change this else to recognize the create circle gesture

      // use cursorPosition variable and interact with google slide api
      console.log("I am going to create a circle now");

    }

    if (said_highlight) {
      //
      console.log("Success in recognizing you said highlight");

    }

    if (said_laser) { // cursor may always be showing right now actually but I can change that
      console.log("I heard you wanted a laser");
      cursorModifier.setOpacity(1);

    }


  }

  return processed;

};
