// Import Famo.us dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var StateModifier = famous.modifiers.StateModifier;
var Draggable = famous.modifiers.Draggable;
var GridLayout = famous.views.GridLayout;


var gridOrigin = [350, 35];

var background, startButton, otherFeedback, tile, mainContext;
var tile, tileTransformModifier, cursorModifier, cursorSurface;
var testingTextOutput, testingModifier, testingOpacityModifier;

var opacityModifiers = [];

// USER INTERFACE SETUP
var setupUserInterface = function() {
  mainContext = Engine.createContext();

  otherFeedback = new Surface({
    content: "",
    size: [undefined, 50],
    properties: {
      backgroundColor: "rgb(34, 34, 34)",
      color: "white"
    }
  });
  var otherStateModifier = new StateModifier({
    origin: [0.0, 1.0],
    align: [0.0, 1.0]
  });
  var otherModifier = new Modifier({
    opacity: 1.0
  });
  // opacityModifiers.push(otherModifier);
  mainContext.add(otherStateModifier).add(otherModifier).add(otherFeedback);

  // Draw the cursor
  cursorSurface = new Surface({
    size : [CURSORSIZE, CURSORSIZE],
    properties : {
        backgroundColor: Colors.RED,
        borderRadius: CURSORSIZE/2 + 'px',
        pointerEvents : 'none',
        zIndex: 1
    }
  });
  var cursorOriginModifier = new StateModifier({origin: [0.5, 0.5]});
  cursorModifier = new Modifier({
    opacity: 0.0,
    transform : function(){
      var cursorPosition = this.get('screenPosition');
      return Transform.translate(cursorPosition[0], cursorPosition[1], 0);
    }.bind(cursor)
  });
  mainContext.add(cursorOriginModifier).add(cursorModifier).add(cursorSurface);


  // Draw the mouse
  mouseSurface = new Surface({
    size : [CURSORSIZE, CURSORSIZE],
    properties : {
        backgroundColor: Colors.BLUE,
        borderRadius: CURSORSIZE/2 + 'px',
        pointerEvents : 'none',
        zIndex: 1
    }
  });
  var mouseOriginModifier = new StateModifier({origin: [0.5, 0.5]});
  mouseModifier = new Modifier({
    opacity: 0.0,
    transform : function(){
      var cursorPosition = this.get('screenPosition');
      return Transform.translate(cursorPosition[0], cursorPosition[1], 0);
    }.bind(mouse)
  });
  mainContext.add(mouseOriginModifier).add(mouseModifier).add(mouseSurface);

};
