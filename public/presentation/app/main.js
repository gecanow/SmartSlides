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
siteControl_jumpSlide(1); // first, make sure the slideshow is at 0
setupUserInterface();

var cursorPosition;
var highlightStart, highlightEnd, previousHighlightStart = [0,0];
var CAN_DRAW_CIRCLE = true; // drawing circle timeout
var yellowHighlightOn = false, orangeHighlightOn = false, pinkHighlightOn = false;
var laserOn = false;


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
// actions: ["next-slide", "prev-slide", "small-circle", "medium-circle", "large-circle"];
// gesture commands: ["right-hand-circle", "left-hand-circle", "right-hand-swipe-right", "left-hand-swipe-left"];
var doAction = function(type, action) {

  if (action == "next-slide") { // TODO: fix circle function calls - maybe not in same scope right now
    console.log("custom next slide")
    goToNextSlide();
  } else if (action == "prev-slide") {
    console.log("custom prev slide")
    goToPrevSlide();
  } else if (action == "small-circle") {
    console.log("custom small circle")
    drawCircle(48, '#FF3333'); // red
  } else if (action == "medium-circle") {
    console.log("custom medium circle")
    drawCircle();
  } else if (action == "large-circle") {
    console.log("custom large circle")
    drawCircle(240, '#FF3333'); // red
  }
}

// this is not working well for me right now because circles are recognized every millisecond and
// they all have the same radius for some reason
var drawCustomCircle = function(circleRadius) {
  if (!CAN_DRAW_CIRCLE) return;
  if (!laserOn) return;
  if (circleRadius < 30) return; // circle gesture is incredibly sensitive
  console.log("I heard you wanted to draw a circle");

  var circleSurface = new Surface({
    size : [circleRadius, circleRadius],
    properties : {
        border: '4px solid ' + '#FF3333',
        borderRadius: circleRadius/2 + 'px',
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
  setTimeout(() => CAN_DRAW_CIRCLE = true, 5000);
};

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
          case "circle":
              console.log("Circle Gesture");
              // CircleGesture circle = new CircleGesture(gesture);
              var clockwise = false;
              var pointableID = gesture.pointableIds[0];
              var direction = frame.pointable(pointableID).direction;
              var dotProduct = Leap.vec3.dot(direction, gesture.normal);
              if (dotProduct  >  0) clockwise = true;

              var circleRadius = gesture.radius;
              console.log(gesture.radius);
              if (clockwise){
                console.log("Clockwise Circle Gesture");
                if (handType == "right") { // clockwise circle with right hand
                  // TODO: can use custom command based on radius (mm)
                  drawCustomCircle(circleRadius);
                }
              } else {
                console.log("Counterclockwise Circle Gesture");
                if (handType == "left") { // counterclockwise circle with left hand
                  // TODO: can use custom command based on radius (mm)
                  drawCustomCircle(circleRadius);
                }
              }
              break;
          // case "keyTap":
          //     // console.log("Key Tap Gesture");
          //     break;
          // case "screenTap":
          //     // console.log("Screen Tap Gesture");
          //     break;
          case "swipe":
              console.log("Swipe Gesture");

              //Classify swipe as either horizontal or vertical
              var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
              //Classify as right-left or up-down
            let swipeDirection;
            if (isHorizontal) {
              if (gesture.direction[0] > 0) {
                swipeDirection = "right";
                // startButton.setContent("I detected a right swipe.");
                console.log(`Found hand type: ${handType}`);
                if (handType == "right") {
                  // go to next slide
                  console.log("should be going to next slide");
                  goToNextSlide();
                }
              } else {
                swipeDirection = "left";
                // startButton.setContent("I detected a left swipe.");
                console.log(`Found hand type: ${handType}`);
                if (handType == "left") {
                  // go to previous slide
                  console.log("should be going to previous slide");
                  goToPrevSlide();
                }
              }
            } else { //vertical
              if (gesture.direction[1] > 0) {
                swipeDirection = "up";
                // console.log(`Found hand type: ${handType}`);
                // if (handType == "right") {
                //   // go to next slide
                //   goToNextSlide();
                // } else {
                //   // go to prev slide
                // }
              } else {
                swipeDirection = "down";
              }
            }
              // console.log(swipeDirection)
              break;
        }
        // CUSTOM GESTURE COMMANDS:
        console.log("current slide for map in gesture: ", siteControl_currentSlideIndex());
        var currentSlide = siteControl_currentSlideIndex();
        console.log("list: ", LIST_OF_COMMANDS);
        for (let [key, value] of LIST_OF_COMMANDS) {
        console.log(key + " = " + value);
        console.log(value.valueOf());
        let slideIds = value["slideIds"];
        var slideIndices = []
        for (let i = 0; i < slideIds.length; i++) {
          slideIndices.push(siteControl_slideIndex(slideIds[i]));
        }
        console.log("slide indices: ", slideIndices);
        var gestureCommands = value["gestureCommands"];
          for (let [gestureCommand, gestureAction] of gestureCommands) {
            console.log(gestureCommand + " = " + gestureAction);
            if (slideIndices.includes(currentSlide)) {
              // console.log(gestureCommand);
              // console.log(gesture.type);
              // console.log(handType);
              if ((gestureCommand == "right-hand-swipe-right") && (gesture.type == "swipe") && (handType == "right")) {
                console.log("do gestureAction: ", gestureAction);
                doAction("gesture", gestureAction);

              } else if ((gestureCommand == "left-hand-swipe-left") && (gesture.type == "swipe") && (handType == "left")) {
                console.log("do gestureAction: ", gestureAction);
                doAction("gesture", gestureAction);

              }
            }
          }
        }
        for (var i = 0; i<LIST_OF_COMMANDS.length; i++) {
          console.log("index i: ", LIST_OF_COMMANDS[i]);
        }
    });
  }

  // Moving the cursor with Leap data
  // Use the hand data to control the cursor's screen position
  cursorPosition = [0, 0];
  var handPosition = hand.screenPosition();
  var x_offset = 50;
  var y_offset = 300;
  cursorPosition[0] = (handPosition[0] + x_offset);
  cursorPosition[1] = (handPosition[1] + y_offset);

  cursor.setScreenPosition(cursorPosition);

  // // SETUP mode
  // if (presentationState.get('state') == 'setup') {
  //   // background.setContent("<h1>SmartSlides</h1><h3 style='color: #7CD3A2;'>start presentation</h3>");
  //   console.log("in setup loop");
  //   siteControl_currentSlideIndex();
  //
  // }
  // //
  // // // presenting or END GAME so draw the board and ships (if player's board)
  // // // Note: Don't have to touch this code
  // else {
  //   if (presentationState.get('state') == 'presenting') {
  //     background.setContent("<h1>SmartSlides</h1><h3 style='color: #7CD3A2;'>presenting.../h3>");
  //   }
  //
  // }
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

    console.log("current slide " + siteControl_currentSlideIndex());
    console.log("jumping to slide 0 now...");
    siteControl_jumpSlide(0);
    console.log("current slide " + siteControl_currentSlideIndex());


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
    var said_create_circle = userSaid(transcript.toLowerCase(), ["create circle", "circle this", "draw a circle", "draw circle", "circle"]);

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

    console.log(LIST_OF_COMMANDS);
    // console.log(slideIds.length);
    // console.log(slideIds);
    // console.log(THUMBNAIL_IDS);

    // speech recognition for jumping to slide number
    // starts with zero index as first slide
    // speech api is being not nice and only wanting to work accurately if done in this very verbose way so sorry about that
    if (userSaid(transcript.toLowerCase(), ["jump to slide zero", "jump to slide 0"])) {
      siteControl_jumpSlide(0);
      console.log("jump to slide zero");
    } else if (userSaid(transcript.toLowerCase(), ["jump to slide one"])) {
      if (THUMBNAIL_IDS.length > 2) {
        siteControl_jumpSlide(1);
      }
      console.log("jump to slide one");
    } else if (userSaid(transcript.toLowerCase(), ["jump to slide two", "jump to slide to"])) {
      if (THUMBNAIL_IDS.length > 3) {
        siteControl_jumpSlide(2);
      }
      console.log("jump to slide two");
    } else if (userSaid(transcript.toLowerCase(), ["jump to slide three", "jump to slide 3"])) {
      if (THUMBNAIL_IDS.length > 4) {
        siteControl_jumpSlide(3);
      }
      console.log("jump to slide three");
    } else if (userSaid(transcript.toLowerCase(), ["jump to slide four", "jump to slide for"])) {
      if (THUMBNAIL_IDS.length > 5) {
        siteControl_jumpSlide(4);
      }
      console.log("jump to slide four");
    } else if (userSaid(transcript.toLowerCase(), ["jump to slide five", "jump to slide 5"])) {
      if (THUMBNAIL_IDS.length > 6) {
        siteControl_jumpSlide(5);
      }
      console.log("jump to slide five");
    } else if (userSaid(transcript.toLowerCase(), ["jump to slide six", "jump to slide 6"])) {
      if (THUMBNAIL_IDS.length > 7) {
        siteControl_jumpSlide(6);
      }
      console.log("jump to slide six");
    } else if (userSaid(transcript.toLowerCase(), ["jump to slide seven", "jump to slide 7"])) {
      if (THUMBNAIL_IDS.length > 8) {
        siteControl_jumpSlide(7);
      }
      console.log("jump to slide 7");
    } else if (userSaid(transcript.toLowerCase(), ["jump to slide eight", "jump to slide 8"])) {
      if (THUMBNAIL_IDS.length > 9) {
        siteControl_jumpSlide(8);
      }
      console.log("jump to slide 8");
    } else if (userSaid(transcript.toLowerCase(), ["jump to slide nine", "jump to slide 9"])) {
      if (THUMBNAIL_IDS.length > 10) {
        siteControl_jumpSlide(9);
      }
      console.log("jump to slide 9");
    } else if (userSaid(transcript.toLowerCase(), ["jump to slide ten", "jump to slide 10"])) {
      if (THUMBNAIL_IDS.length > 11) {
        siteControl_jumpSlide(10);
      }
      console.log("jump to slide 10");
    }

    // var spelled_out_numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen"];
    // var said_slide = userSaid(transcript.toLowerCase(), ["jump to slide"]);
    // for (var i = 0; i < THUMBNAIL_IDS.length; i++) {
    //   // console.log(userSaid(transcript.toLowerCase(), spelled_out_numbers[i]) + " " + spelled_out_numbers[i]);
    //   // console.log(userSaid(transcript.toLowerCase(), spelled_out_numbers[i]) + " " + spelled_out_numbers[i]);
    //   console.log(said_slide);
    //   if (said_slide) {
    //     if (userSaid(transcript.toLowerCase(), spelled_out_numbers[i+1])) {
    //       console.log("user said to go to slide " + i+1);
    //       siteControl_jumpSlide(i);
    //       said_slide = false;
    //       break;
    //     }
    //   }
    // }

    if (userSaid(transcript.toLowerCase(), ["test"])) {
      var circleSurface = new Surface({
        size : [500, 500],
        properties : {
            border: '4px solid ' + '#FF3333',
            borderRadius: 500/2 + 'px',
            zIndex: 1
        }
      });
      var circleModifier = new StateModifier(
        {origin: [0.5, 0.5],
        transform: Transform.translate(300, 300, 0)});
      var circleOpacity = new Modifier({
          opacity: 1.0
      });
      mainContext.add(circleModifier).add(circleOpacity).add(circleSurface);
      addedElementModifiers.push(circleOpacity);
    }

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
    }


    if (said_start_highlight && (yellowHighlightOn || orangeHighlightOn || pinkHighlightOn)) {
      highlightStart = [cursorPosition[0], cursorPosition[1]];
    }

    if (said_stop_highlight && highlightStart != previousHighlightStart) {
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
      laserOn = true;

    }

    if (said_stop_laser) {
      console.log("I heard you wanted to stop the laser");
      cursorModifier.setOpacity(0);
      laserOn = false;
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
    };

    if (said_text_box) {
      console.log("I heard you want to place a text box.");
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
      console.log("about to write text: ", text);
      textSurface.setContent(text);
    }

    // CUSTOM SPEECH COMMANDS
    console.log("current slide for map in speech: ", siteControl_currentSlideIndex());
    var currentSlide = siteControl_currentSlideIndex();
    console.log("list: ", LIST_OF_COMMANDS);
    // console.log("length: ", LIST_OF_COMMANDS.keys());
    for (let [key, value] of LIST_OF_COMMANDS) {
      console.log(key + " = " + value);
      // console.log(value.valueOf());
      let slideIds = value["slideIds"];
      var slideIndices = []
      for (let i = 0; i < slideIds.length; i++) {
        slideIndices.push(siteControl_slideIndex(slideIds[i]));
      }
      console.log("slide indices: ", slideIndices);
      var voiceCommands = value["voiceCommands"];
      for (let [speechCommand, speechAction] of voiceCommands) {
        // console.log("values");
        console.log(speechCommand + " = " + speechAction);
        if (userSaid(speechCommand)) {
          // TODO: do speechAction
          console.log("do speechAction: ", speechAction);
        }
      }


    }
  }

  return processed;

};
