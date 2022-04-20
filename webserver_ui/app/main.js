// GAME SETUP
var initialState = SKIPSETUP ? "presenting" : "setup";
var presentationState = new PresentationState({state: initialState});
var cursor = new Cursor();

var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var StateModifier = famous.modifiers.StateModifier;
var Draggable = famous.modifiers.Draggable;
var GridLayout = famous.views.GridLayout;

// UI SETUP
setupUserInterface();

var usingGestures = true; // set to false if check gestureCheckbox, default is to recognize gestures
var usingSpeech = true; // set to false if check the speechCheckbox, default is on

var cursorPosition;
var highlightStart, highlightEnd;

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
              // console.log("Circle Gesture");
              // startButton.setContent("I detected you made a circle gesture!");
              // CircleGesture circle = new CircleGesture(gesture);
              var clockwise = false;
              var pointableID = gesture.pointableIds[0];
              var direction = frame.pointable(pointableID).direction;
              var dotProduct = Leap.vec3.dot(direction, gesture.normal);
              if (dotProduct  >  0) clockwise = true;

              if (clockwise){
                // console.log("Clockwise Circle Gesture");
                // startButton.setContent("I detected a clockwise circle gesture");
              } else {
                // console.log("Counterclockwise Circle Gesture");
                // startButton.setContent("I detected a counterclockwise circle gesture");
              }

              break;
          case "keyTap":
              // console.log("Key Tap Gesture");
              // startButton.setContent("I detected a key tap gesture.");
              break;
          case "screenTap":
              // console.log("Screen Tap Gesture");
              // startButton.setContent("I detected a screen tap gesture.");
              break;
          case "swipe":
              console.log("Swipe Gesture");
              // startButton.setContent("I detected a swipe gesture.");

              //Classify swipe as either horizontal or vertical
              var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
              //Classify as right-left or up-down
            let swipeDirection;
            if (isHorizontal) {
              if (gesture.direction[0] > 0) {
                swipeDirection = "right";
                startButton.setContent("I detected a right swipe.");
              } else {
                swipeDirection = "left";
                startButton.setContent("I detected a left swipe.");
              }
            } else { //vertical
              if (gesture.direction[1] > 0) {
                swipeDirection = "up";
                startButton.setContent("I detected an up swipe.");
              } else {
                swipeDirection = "down";
                startButton.setContent("I detected a down swipe.");
              }
            }
            // if(frame.pointables.length > 0){
            //   frame.gestures.forEach(function(gesture){
            //       var pointableIds = gesture.pointableIds;
            //       pointableIds.forEach(function(pointableId){
            //         console.log("pointable: ")
            //         var pointable = frame.pointable(pointableId);
            //         console.log(pointable);
            //       });
            //   });
            // }
              console.log(swipeDirection)
              break;
        }
    });
    // testing getting last gesture
    console.log("all gestures: ")
    console.log(frame.gestures)
    // console.log("last gesture: ")
    // console.log(frame.gestures[-1])
    // for (gest in frame.gestures) {
    //     console.log("gest: ", gest)
    //     // console.log("gest: ", frame.gestures.gest)
    // }

  }

  // Moving the cursor with Leap data
  // Use the hand data to control the cursor's screen position
  cursorPosition = [0, 0];
  var handPosition = hand.screenPosition();
  var x_offset = 100;;
  var y_offset = 300;
  cursorPosition[0] = (handPosition[0] + x_offset);
  cursorPosition[1] = (handPosition[1] + y_offset);

  cursor.setScreenPosition(cursorPosition);
  // console.log(highlighting);
  // if (highlighting) {
  //   var highlightSurface = new Surface({
  //     size : [CURSORSIZE, CURSORSIZE],
  //     properties : {
  //         backgroundColor: Colors.YELLOW,
  //         borderRadius: CURSORSIZE/2 + 'px'
  //     }
  //   });
  //   var highlightModifier = new StateModifier(
  //     {origin: [0.5, 0.5],
  //     transform: Transform.translate(cursorPosition[0], cursorPosition[1], 0)});
  //
  //   mainContext.add(highlightSurface).add(highlightModifier);
  // }

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
      // console.log(presentationState);
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
      startButton.setContent("Beginning Presentation!");
      // speechCheckbox.setContent("");
      // gestureCheckbox.setContent("");
      background.setContent("");

      if (DEBUGSPEECH) tile.setSize([1800, 800]); // use this if want to see the debug speech
      else tile.setSize([1800, 900]); // full screen
      tileTransformModifier.setTransform(Transform.translate(-250, -35));
      tile.setProperties({backgroundColor: "black"});
      startButton.setProperties({backgroundColor: "black"});
      processed = true;
    }
  }

  else if (presentationState.get('state') == 'presenting') {
    console.log("I am recognizing speech and in presenting mode");
    console.log("why is this not printing");

    // not implementing transitioning slides right now
    var said_next_slide = userSaid(transcript.toLowerCase(), ["next slide", "next"]);
    var said_prev_slide = userSaid(transcript.toLowerCase(), ["previous slide", "previous"]);

    // current speech recognition
    var said_create_circle = userSaid(transcript.toLowerCase(), ["create circle", "circle this", "draw a circle", "draw circle", "circle", "circle here"]);
    var said_highlight = userSaid(transcript.toLowerCase(), ["highlight this", "create highlight", "make highlight", "highlight here", "highlight", "high light"]);
    var said_stop_highlight = userSaid(transcript.toLowerCase(), ["now stop", "stop"])
    var said_laser = userSaid(transcript.toLowerCase(), ["start laser pointer", "laser", "cursor", "laser pointer"]);
    var said_stop_laser = userSaid(transcript.toLowerCase(), ["stop laser pointer", "stop laser", "stop cursor", "stop laser pointer"]);

    if (said_create_circle) { // also change this else to recognize the create circle gesture

      // use cursorPosition variable and interact with google slide api
      console.log("I heard you wanted to draw a circle");
      startButton.setContent("I heard you are trying to draw a circle!");
      // cursorPosition = [500, 500];

      var circleSurface = new Surface({
        size : [200, 200],
        properties : {
            border: '4px solid #FF3333',
            // boxShadow: '0 10px 10px 10px rgba(255, 0, 0, 1)',
            borderRadius: 200/2 + 'px',
            zIndex: 1
        }
      });
      var circleModifier = new StateModifier(
        {origin: [0.5, 0.5],
        transform: Transform.translate(cursorPosition[0], cursorPosition[1], 0)});
      mainContext.add(circleModifier).add(circleSurface);

      // will want to do something so when we go to the next slide there is no more circle
    }

    if (said_highlight) {
      console.log("I heard you wanted to make a highlight");
      startButton.setContent("I heard you are trying to highlight!");
      cursorSurface.setProperties({backgroundColor: Colors.YELLOW})
      cursorModifier.setOpacity(0.75);
      highlighting = true;
      highlightStart = [cursorPosition[0], cursorPosition[1]];
      console.log(highlightStart);
    }

    if (said_stop_highlight) {
      console.log("I heard you wanted to stop the highlight");
      startButton.setContent("I heard you are trying to stop the highlight!");
      cursorModifier.setOpacity(0);
      highlightEnd = [cursorPosition[0], cursorPosition[1]];
      console.log(highlightEnd);
      var highlightSurface = new Surface({
        size: [Math.abs(highlightEnd[0]-highlightStart[0]), Math.abs(highlightEnd[1]-highlightStart[1])],
        // size: [500, 500],
        properties: {
          backgroundColor: Colors.YELLOW
          // color: "white"
        }
      });
      var highlightModifier = new Modifier({
        opacity: 0.75
      })
      var highlightStateMod = new StateModifier({
        transform: Transform.translate(highlightStart[0], highlightStart[1], 0)
      });
      mainContext.add(highlightStateMod).add(highlightModifier).add(highlightSurface);
    }

    if (said_laser) { // cursor may always be showing right now actually but I can change that
      console.log("I heard you wanted a laser");
      startButton.setContent("I heard you wanted a laser (laser should be on screen now)!");
      cursorSurface.setProperties({backgroundColor: Colors.RED})
      cursorModifier.setOpacity(1);

    }

    if (said_stop_laser) {
      console.log("I heard you wanted to stop the laser");
      startButton.setContent("I heard you wanted to stop using the laser (laser should not be on screen now)!");
      cursorModifier.setOpacity(0);
    }

    if (said_next_slide) {
      console.log("I heard you wanted to go to the next slide.");
      startButton.setContent("I heard you wanted to go to the next slide.");
    }


    if (said_prev_slide) {
      console.log("I heard you wanted to go to the previous slide.");
      startButton.setContent("I heard you wanted to go to the previous slide.");
    }


  }

  return processed;

};
