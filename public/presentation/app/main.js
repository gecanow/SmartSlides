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
setTimeout(() => {
  siteControl_jumpSlide(1); // first, make sure the slideshow is at 1
}, 100);

var cursorPosition;
var highlightStart, highlightEnd, previousHighlightStart = [0,0];
var CAN_DRAW_CIRCLE = true; // drawing circle timeout
var yellowHighlightOn = false, orangeHighlightOn = false, pinkHighlightOn = false;
var laserOn = false;
var circleStart, circleEnd, previousCircleStart = [0,0];

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
var doAction = function(action) {

  if (action == "next-slide") {
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

// this does not work well because circle gesture recognition accuracy is low
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
          // case "circle":
              // console.log("Circle Gesture");
              // // CircleGesture circle = new CircleGesture(gesture);
              // var clockwise = false;
              // var pointableID = gesture.pointableIds[0];
              // var direction = frame.pointable(pointableID).direction;
              // var dotProduct = Leap.vec3.dot(direction, gesture.normal);
              // if (dotProduct  >  0) clockwise = true;
              //
              // var circleRadius = gesture.radius;
              // console.log(gesture.radius);
              // if (clockwise){
              //   console.log("Clockwise Circle Gesture");
              //   if (handType == "right") { // clockwise circle with right hand
              //     // can use custom command based on radius (mm)
              //     drawCustomCircle(circleRadius);
              //   }
              // } else {
              //   console.log("Counterclockwise Circle Gesture");
              //   if (handType == "left") { // counterclockwise circle with left hand
              //     // can use custom command based on radius (mm)
              //     drawCustomCircle(circleRadius);
              //   }
              // }
              // break;
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
              if ((gestureCommand == "right-hand-swipe-right") && (gesture.type == "swipe") && (handType == "right")) {
                console.log("do gestureAction: ", gestureAction);
                doAction(gestureAction);

              } else if ((gestureCommand == "left-hand-swipe-left") && (gesture.type == "swipe") && (handType == "left")) {
                console.log("do gestureAction: ", gestureAction);
                doAction(gestureAction);

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


// processSpeech(transcript)
//  Is called anytime speech is recognized by the Web Speech API
// Input:
//    transcript, a string of possibly multiple words that were recognized
// Output:
//    processed, a boolean indicating whether the system reacted to the speech or not
var processSpeech = function(transcript) {
  // console.log(LIST_OF_COMMANDS);

  // Helper function to detect if any commands appear in a string
  var userSaid = function(str, commands) {
    for (var i = 0; i < commands.length; i++) {
      if (str.indexOf(commands[i]) > -1)
        return true;
    }
    return false;
  };
  // Helper function to detect if a user matched a regex
  var userMatched = function(str, regex) {
    // EXAMPLE:
    // str = `battleship to column a row 5`;
    // regex = /(?<ship>battleship|destroyer|patrolboat)[ a-z]*(?<row>[a-e])[ a-z]*(?<col>[1-5]|one|two|three|four|five)/mg;
    // found = regex.exec(str);
    // then... found.groups.ship, found.groups.row, found.groups.col will be accessible
    return regex.exec(str.toLowerCase());
  };
  // Helper function for parsing spoken numbers
  var parseSpokenNumber = function (num) {
    let n;
    switch (num) {
      case "one": n = 1; break;
      case "two":
      case "too":
      case "to": n = 2; break;
      case "three": n = 3; break;
      case "for":
      case "four": n = 4; break;
      case "five": n = 5; break;
      case "six": n = 6; break;
      case "seven": n = 7; break;
      case "eight": n = 8; break;
      case "nine": n = 9; break;
      case "ten": n = 10; break;
      default: n = parseInt(num);
    }
    return n;
  }

  var processed = false;

  if (presentationState.get('state') == 'setup') {
    console.log("I am recognizing speech and in setup mode");

    siteControl_jumpSlide(1);


    // moved up the below lines, don't start with speech
    presentationState.startPresentation();
    processed = true;
    highlightOn = false;
    //

  }

  else if (presentationState.get('state') == 'presenting') {
    console.log("I am recognizing speech and in presenting mode");

    // moving to next and previous slides
    var said_next_slide = userSaid(transcript.toLowerCase(), ["next slide", "next"]);
    var said_prev_slide = userSaid(transcript.toLowerCase(), ["previous slide", "previous"]);

    // current speech recognition

    // default circle

    var said_create_circle = userSaid(transcript.toLowerCase(), ["create circle", "circle this", "circle"]);
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

    if (userSaid(transcript.toLowerCase(), ["play video"])) {
      console.log("ok, playing video");
      siteControl_playVideo();
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
    let jumpToRegex = /jump (to|2|two) (?<loc>slide|scene) (?<num>([0-9]|zero|one|two|to|too|three|four|for|five|six|seven|eight|ate|nine)*)/mg;
    let jumpToMatch = userMatched(transcript.toLowerCase(), jumpToRegex);
    if (jumpToMatch) {
      // first parse the n into a valid
      let n = parseSpokenNumber(`${jumpToMatch.groups.num}`);
      console.log(`jumping to ${jumpToMatch.groups.loc} ${n}`)
      switch (`${jumpToMatch.groups.loc}`) {
        case 'slide':
          addedElementModifiers.forEach(function (item, index) {
            item.setOpacity(0);
          });
          siteControl_jumpSlide(n);
          break;
        case 'scene':
          siteControl_jumpScene(n); break;
        default:
          console.log("could not jump :(");
      }
    }

    let rewindffRegex = /(?<loc>back|forward) (?<num>([0-9]|zero|one|two|to|too|three|four|for|five|six|seven|eight|ate|nine)*) slide[s]?/mg;
    let rewindffMatch = userMatched(transcript.toLowerCase(), rewindffRegex);
    if (rewindffMatch) {
      console.log(rewindffMatch);
      // first parse the n into a valud
      let n = parseSpokenNumber(`${rewindffMatch.groups.num}`);
      console.log(`${rewindffMatch.groups.loc} ${n} slides`)
      switch (`${rewindffMatch.groups.loc}`) {
        case 'back':
          siteControl_rewindSlide(n - 1); break;
        case 'forward':
          siteControl_ffSlide(n + 1); break;
        default:
          console.log("could not rewind/fast forward :(");
      }
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

    if (userSaid(transcript.toLowerCase(), ["turtle"])) {
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


    if (userSaid(transcript.toLowerCase(), ["start circle here"])) {
      console.log("start circle here");
      said_create_circle = false;
      if (laserOn) {
        circleStart = [cursorPosition[0], cursorPosition[1]];
        console.log("circle start " + circleStart);
      }
    }

    if (userSaid(transcript.toLowerCase(), ["end circle here"])) {
      console.log("end circle here");
      said_create_circle = false;
      if (laserOn && circleStart != previousCircleStart) {
        previousCircleStart = circleStart;
        console.log("circle end");
        circleEnd = [cursorPosition[0], cursorPosition[1]];
        var circleDiameter = Math.abs(circleEnd[0] - circleStart[0]);
        var circleSurface = new Surface({
          size : [circleDiameter, circleDiameter],
          properties : {
              border: '4px solid ' + '#FF3333',
              borderRadius: circleDiameter/2 + 'px',
              zIndex: 1
          }
        });
        var circleModifier = new StateModifier(
          {origin: [0.5, 0.5],
          transform: Transform.translate((circleStart[0]+circleEnd[0])/2.0, (circleStart[1]+circleEnd[1])/2.0, 0)});
        var circleOpacity = new Modifier({
            opacity: 1.0
        });
        mainContext.add(circleModifier).add(circleOpacity).add(circleSurface);
        addedElementModifiers.push(circleOpacity);
      }
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
        if (box == "box") {
          var text = transcript.slice(i+4);
          // console.log("text to display: ", text)
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
      // console.log("about to write text: ", text);
      textSurface.setContent(text);
    }

    // CUSTOM SPEECH COMMANDS
    // console.log("current slide for map in speech: ", siteControl_currentSlideIndex());
    var currentSlide = siteControl_currentSlideIndex();
    // console.log("list: ", LIST_OF_COMMANDS);
    // console.log("length: ", LIST_OF_COMMANDS.keys());
    for (let [key, value] of LIST_OF_COMMANDS) {
      // console.log(key + " = " + value);
      // console.log(value.valueOf());
      let slideIds = value["slideIds"];
      var slideIndices = []
      for (let i = 0; i < slideIds.length; i++) {
        slideIndices.push(siteControl_slideIndex(slideIds[i]));
      }
      var voiceCommands = value["voiceCommands"];

      for (let [speechCommand, speechAction] of voiceCommands) {
        // console.log("values");
        var sc = [];
        sc.push(speechCommand);
        if (userSaid(transcript.toLowerCase(), sc)) {
          if (slideIndices.includes(currentSlide)) {
            doAction(speechAction);
            console.log("do speechAction: ", speechAction);
          }
        }
      }
    }

  }

  return processed;

};
