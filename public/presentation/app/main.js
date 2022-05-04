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

var cursorPosition;
var highlightStart, highlightEnd, previousHighlightStart = [0,0];
var CAN_DRAW_CIRCLE = true; // drawing circle timeout
var yellowHighlightOn = false, orangeHighlightOn = false, pinkHighlightOn = false;

var addedElementModifiers = []; // list of opacity modifiers for circles and highlights

var CAN_ADVANCE_SLIDESHOW = true;
var goToNextSlide = function() {
  if (!CAN_ADVANCE_SLIDESHOW) return;

  addedElementModifiers.forEach(function (item, index) {
    item.setOpacity(0);
  });
  
  siteControl_next();

  CAN_ADVANCE_SLIDESHOW = false;
  setTimeout(() => CAN_ADVANCE_SLIDESHOW = true, 2000);
}
var goToPrevSlide = function() {
  if (!CAN_ADVANCE_SLIDESHOW) return;

  addedElementModifiers.forEach(function (item, index) {
    item.setOpacity(0);
  });
  
  siteControl_prev();
  
  CAN_ADVANCE_SLIDESHOW = false;
  setTimeout(() => CAN_ADVANCE_SLIDESHOW = true, 2000);
}

// var recordTextBox = function() {
//   console.log("recording for text box")
//   var debouncedProcessSpeech = _.debounce(processSpeech, 500);
//   console.log("debounced")
//   var textBoxRecognition = new webkitSpeechRecognition();
//   console.log("made new webkit")
//   var endTextBox = "stop now";
//   textBoxRecognition.start();
//   console.log("started recognition")
//   textBoxRecognition.continuous = true;
//   textBoxRecognition.interimResults = true;
//   console.log("about to start function")
//   textBoxRecognition.onresult = function(event) {
//     console.log("in text event")
//     // Build the interim transcript, so we can process speech faster
//     var textBoxTranscript = '';
//     var hasFinal = false;
//     for (var i = event.resultIndex; i < event.results.length; ++i) {
//       console.log("in text result")
//       if (event.results[i].isFinal) {
//         hasFinal = true;
//         textBoxRecognition.stop();
//         console.log("stopped recording because hasFinal=true");
//         console.log("textBoxTranscript:");
//         console.log(textBoxTranscript);
//       } else {
//         textBoxTranscript += event.results[i][0].transcript;
//         if (endTextBox in textBoxTranscript) {
//           textBoxRecognition.stop();
//           console.log("stopped recording because of stop now command");
//           console.log("transcript:");
//           console.log(textBoxTranscript);
//         }
//       }
//     }
//
//     var processed = debouncedProcessSpeech(textBoxTranscript);
//
//     // If we reacted to speech, kill recognition and restart
//     if (processed) {
//       textBoxRecognition.stop();
//       console.log("stopped recording because processed")
//       console.log("textBoxTranscript:");
//       console.log(textBoxTranscript);
//     }
//   };
//
//
// }

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
          // console.log("hand: ", handNow.type)
        });

        switch (gesture.type){
          // case "circle":
          //     // console.log("Circle Gesture");
          //     // startButton.setContent("I detected you made a circle gesture!");
          //     // CircleGesture circle = new CircleGesture(gesture);
          //     var clockwise = false;
          //     var pointableID = gesture.pointableIds[0];
          //     var direction = frame.pointable(pointableID).direction;
          //     var dotProduct = Leap.vec3.dot(direction, gesture.normal);
          //     if (dotProduct  >  0) clockwise = true;
          //
          //     if (clockwise){
          //       // console.log("Clockwise Circle Gesture");
          //       // startButton.setContent("I detected a clockwise circle gesture");
          //     } else {
          //       // console.log("Counterclockwise Circle Gesture");
          //       // startButton.setContent("I detected a counterclockwise circle gesture");
          //     }
          //
          //     break;
          // case "keyTap":
          //     // console.log("Key Tap Gesture");
          //     // startButton.setContent("I detected a key tap gesture.");
          //     break;
          // case "screenTap":
          //     // console.log("Screen Tap Gesture");
          //     // startButton.setContent("I detected a screen tap gesture.");
          //     break;
          case "swipe":
              // console.log("Swipe Gesture");
              // startButton.setContent("I detected a swipe gesture.");

              //Classify swipe as either horizontal or vertical
              var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
              //Classify as right-left or up-down
            let swipeDirection;
            if (isHorizontal) {
              if (gesture.direction[0] > 0) {
                swipeDirection = "right";
                startButton.setContent("I detected a right swipe.");
                console.log(`Found hand type: ${handType}`);
                if (handType == "right") {
                  // go to next slide
                  goToNextSlide();
                }
              } else {
                swipeDirection = "left";
                startButton.setContent("I detected a left swipe.");
                console.log(`Found hand type: ${handType}`);
                if (handType == "left") {
                  // go to previous slide
                  goToPrevSlide();
                }
              }
            } else { //vertical
              if (gesture.direction[1] > 0) {
                swipeDirection = "up";
                // startButton.setContent("I detected an up swipe.");
                // console.log(`Found hand type: ${handType}`);
                // if (handType == "right") {
                //   // go to next slide
                //   goToNextSlide();
                // } else {
                //   // go to prev slide
                // }
              } else {
                swipeDirection = "down";
                // startButton.setContent("I detected a down swipe.");
              }
            }
              // console.log(swipeDirection)
              break;
        }
    });
  }

  // Moving the cursor with Leap data
  // Use the hand data to control the cursor's screen position
  cursorPosition = [0, 0];
  var handPosition = hand.screenPosition();
  var x_offset = 50;
  var y_offset = 300;
  // var x_offset = 200;
  // var y_offset = 600;
  cursorPosition[0] = (handPosition[0] + x_offset);
  cursorPosition[1] = (handPosition[1] + y_offset);

  cursor.setScreenPosition(cursorPosition);

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

  }
}}).use('screenPosition', {scale: LEAPSCALE})});



// processSpeech(transcript)
//  Is called anytime speech is recognized by the Web Speech API
// Input:
//    transcript, a string of possibly multiple words that were recognized
// Output:
//    processed, a boolean indicating whether the system reacted to the speech or not
var processSpeech = function(transcript) {
  console.log(LIST_OF_COMMANDS);
  
  // Helper function to detect if any commands appear in a string
  var userSaid = function(str, commands) {
    for (var i = 0; i < commands.length; i++) {
      if (str.indexOf(commands[i]) > -1)
        return true;
    }
    return false;
  };


  // draw circle on screen
  // circleSize: int of pixel size (diameter of circle), default is 100
  // circleColor: string of hex values, default is red "#FF3333"
  var drawCircle = function(circleSize = 100, circleColor = '#FF3333') {
    if (!CAN_DRAW_CIRCLE) return;
    console.log("I heard you wanted to draw a circle");
    // console.log(circleSize);
    // console.log(circleColor);
    // circleSize = 48;
    var circleSurface = new Surface({
      size : [circleSize, circleSize],
      properties : {
          border: '4px solid ' + circleColor,
          borderRadius: circleSize/2 + 'px',
          zIndex: 1
      }
    });
    var circleModifier = new StateModifier(
      {origin: [0.5, 0.5],
      transform: Transform.translate(cursorPosition[0], cursorPosition[1], 0)});
    var circleOpacity = new Modifier({
        opacity: 1.0
    });
    mainContext.add(circleModifier).add(circleOpacity).add(circleSurface);
    addedElementModifiers.push(circleOpacity);
    CAN_DRAW_CIRCLE = false;
    setTimeout(() => CAN_DRAW_CIRCLE = true, 1000);
  };

  var processed = false;

  if (presentationState.get('state') == 'setup') {
    console.log("I am recognizing speech and in setup mode");

    // moved up the below lines, don't start with speech
    presentationState.startPresentation();
    processed = true;
    highlightOn = false;
    //

    // Starting the presentation with speech
    // Detect the 'start' command, and start the game if it was said
    // var said_start = userSaid(transcript, ["start"]); // start commmand is said
    // if (said_start) {
    //   presentationState.startPresentation();
    //   // window.location.href = "../index.html";
    //   /// get rid of all text and go to full screen (currently black full screen)
    //   console.log("I am here yay");
    //   startButton.setContent("Beginning Presentation!");
    //   background.setContent("");
    //   // backgroundModifier.setOpacity(0.0);
    //   opacityModifiers.forEach(function (item, index) {
    //     // console.log(item);
    //     // console.log(index);
    //     item.setOpacity(0);
    //   });
    //   // switchSlideUI();
    //
    // }
  }

  else if (presentationState.get('state') == 'presenting') {
    console.log("I am recognizing speech and in presenting mode");

    // moving to next and previous slides
    var said_next_slide = userSaid(transcript.toLowerCase(), ["next slide", "next"]);
    var said_prev_slide = userSaid(transcript.toLowerCase(), ["previous slide", "previous"]);

    // current speech recognition

    // default circle
    var said_create_circle = userSaid(transcript.toLowerCase(), ["create circle", "circle this", "draw a circle", "draw circle", "circle", "circle here"]);

    // circle options
    var said_small_circle = userSaid(transcript.toLowerCase(), ["small circle"]);
    var said_big_circle = userSaid(transcript.toLowerCase(), ["big circle", "large circle"]);
    var said_blue_circle = userSaid(transcript.toLowerCase(), ["blue circle"]);
    var said_green_circle = userSaid(transcript.toLowerCase(), ["green circle"]);
    var said_small_green_circle = userSaid(transcript.toLowerCase(), ["small green circle"]);
    var said_small_blue_circle = userSaid(transcript.toLowerCase(), ["small blue circle"]);
    var said_big_green_circle = userSaid(transcript.toLowerCase(), ["big green circle", "large green circle"]);
    var said_big_blue_circle = userSaid(transcript.toLowerCase(), ["big blue circle", "large blue circle"]);

    var said_red_circle = userSaid(transcript.toLowerCase(), ["red circle"]);
    var said_small_red_circle = userSaid(transcript.toLowerCase(), ["small red circle"]);
    var said_big_red_circle = userSaid(transcript.toLowerCase(), ["big red circle", "large red circle"]);

    // highlight -- probably going to get rid of this
    var said_highlight = userSaid(transcript.toLowerCase(), ["turn on highlight", "highlight", "highlights"]);
    var said_pink_highlight = userSaid(transcript.toLowerCase(), ["turn on pink highlight", "pink highlight"]); // '#FF00FF'
    var said_orange_highlight = userSaid(transcript.toLowerCase(), ["turn on orange highlight", "orange highlight"]); // '#FF9900'

    var said_off_highlight = userSaid(transcript.toLowerCase(), ["turn off", "turn off highlight", "turn off highlights", "turn off my light"]); // commonly mishears turn off highlight as turn off my light
    var said_start_highlight = userSaid(transcript.toLowerCase(), ["start"]);

    var said_undo = userSaid(transcript.toLowerCase(), ["undo"]);

    if (userSaid(transcript.toLowerCase(), ["stop"]) && (yellowHighlightOn || orangeHighlightOn || pinkHighlightOn)) {
      var said_stop_highlight = true;
    } else if (userSaid(transcript.toLowerCase(), ["stop"])) {
      said_stop_laser = true;
      // var said_stop_highlight = false;
    }

    if (said_stop_highlight) said_highlight = false;

    // laser
    var said_laser = userSaid(transcript.toLowerCase(), ["laser", "cursor", "laser pointer"]);
    var said_stop_laser = userSaid(transcript.toLowerCase(), ["stop laser", "stop laser pointer", "turn off laser"]);


    var said_text_box = userSaid(transcript.toLowerCase(), ["text box", "textbox"]);


    if (said_small_blue_circle) {
      drawCircle(48, '#0040ff');
    } else if (said_big_green_circle) {
      drawCircle(240, '#00CC44');
    } else if (said_small_green_circle) {
      drawCircle(48, '#00CC44');
    } else if (said_big_blue_circle) {
      drawCircle(240, '#0040ff');
    } else if (said_blue_circle) {
      drawCircle(100, '#0040ff');
    } else if (said_green_circle) {
      drawCircle(100, '#00CC44');
    } else if (said_small_circle || said_small_red_circle) {
      drawCircle(48, '#FF3333'); // red
    } else if (said_big_circle || said_big_red_circle) {
      drawCircle(240, '#FF3333'); // red
    } else if (said_create_circle || said_red_circle) { // default circle
      drawCircle(); // red, regular size
    }

    if (said_highlight) {
      console.log("I heard you wanted to make a highlight");
      if (said_pink_highlight) {
        cursorSurface.setProperties({backgroundColor: '#FF00FF'});
        pinkHighlightOn = true;
      } else if (said_orange_highlight) {
        cursorSurface.setProperties({backgroundColor: '#FF9900'});
        orangeHighlightOn = true;
      } else {
        cursorSurface.setProperties({backgroundColor: Colors.YELLOW});
        yellowHighlightOn = true;
      }

      cursorModifier.setOpacity(0.65);

      // console.log(highlightStart);

    }

    // console.log(said_start_highlight);
    // console.log((yellowHighlightOn || orangeHighlightOn || pinkHighlightOn));
    if (said_start_highlight && (yellowHighlightOn || orangeHighlightOn || pinkHighlightOn)) {
      highlightStart = [cursorPosition[0], cursorPosition[1]];
    }

    // console.log("i am here");
    // console.log(highlightStart != previousHighlightStart);
    if (said_stop_highlight && highlightStart != previousHighlightStart) {
      // console.log(highlightStart != previousHighlightStart);
      // console.log(highlightStart);
      // console.log(previousHighlightStart);
      previousHighlightStart = highlightStart;


      var color;
      if (yellowHighlightOn) {
        color = Colors.YELLOW;
      } else if (orangeHighlightOn) {
        color = '#FF9900';
      } else if (pinkHighlightOn) {
        color = '#FF00FF';
      }
      console.log("I heard you wanted to stop the highlight");

      highlightEnd = [cursorPosition[0], cursorPosition[1]];
      console.log(highlightEnd);
      var highlightSurface = new Surface({
        size: [Math.abs(highlightEnd[0]-highlightStart[0]), Math.abs(highlightEnd[1]-highlightStart[1])],
        // size: [Math.abs(highlightEnd[0]-highlightStart[0]), 80], // set standard highlight height
        properties: {
          backgroundColor: color
        }
      });
      var highlightModifier = new Modifier({
        opacity: 0.60
      })
      var highlightStateMod = new StateModifier({
        transform: Transform.translate(highlightStart[0], highlightStart[1], 0)
      });
      mainContext.add(highlightStateMod).add(highlightModifier).add(highlightSurface);
      addedElementModifiers.push(highlightModifier);

    }

    if (said_off_highlight) {
      cursorModifier.setOpacity(0);
      yellowHighlightOn = false;
      orangeHighlightOn = false;
      pinkHighlightOn = false;
    }

    if (said_laser) { // cursor may always be showing right now actually but I can change that
      console.log("I heard you wanted a laser");
      cursorSurface.setProperties({backgroundColor: Colors.RED});
      cursorModifier.setOpacity(1);

    }

    if (said_stop_laser) {
      console.log("I heard you wanted to stop the laser");
      cursorModifier.setOpacity(0);
    }

    if (said_next_slide) {
      console.log("I heard you wanted to go to the next slide.");
      goToNextSlide();
    }


    if (said_prev_slide) {
      console.log("I heard you wanted to go to the previous slide.");
      goToPrevSlide();
    }

    if (said_undo) {
      console.log("I heard you wanted to undo the last drawing.");
      addedElementModifiers[addedElementModifiers.length - 1].setOpacity(0);
    }

    function editTranscript(transcript) {
      for (let i = 0; i < transcript.length; i++) {
        var box = transcript.slice(i, i+3);
        // console.log("box? ", box);
        if (box == "box") {
          var text = transcript.slice(i+4);
          console.log("text to display: ", text)
          return text;
        }
      }
    }

    if (said_text_box) {
      console.log("I heard you want to place a text box.");
      // var text = recordTextBox()
      // console.log("text: ", text);
      console.log("transcript: ", transcript);
      var text = editTranscript(transcript);

      var textSurface = new Surface({
        content: "",
        size: [500, 500],
        properties: {
          backgroundColor: Colors.WHITE,
          color: "black",
          fontSize: "2em",
        }
      });
      var textModifier = new StateModifier({
        origin: [0.0, 1.0],
        align: [0.0, 0.65],
        transform: Transform.translate(cursorPosition[0], cursorPosition[1], 0)
      });
      var textOpacity = new Modifier({
        opacity: 0.0
      });
      opacityModifiers.push(textOpacity);
      mainContext.add(textModifier).add(textOpacity).add(textSurface);
      addedElementModifiers.push(textOpacity);
      textOpacity.setOpacity(1);
      console.log("about to write text");
      textSurface.setContent(text);

    }
  }

  return processed;

};
