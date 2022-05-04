var Cursor = Backbone.Model.extend({
  defaults: {
    screenPosition: [0, 0]
  },
  setScreenPosition: function(position) {
    this.set('screenPosition', position.slice(0));
  }
});


var PresentationState = Backbone.Model.extend({
  defaults: {
    state: "setup", // setup, playing, end
    turn: "presentation",  // player, cpu
    boards: [],
    waiting: true
  },

  initialize: function() {

  },

  startPresentation: function() {
    if (this.get('state') == 'setup')
      this.set('state', 'presenting');
    else
      alert("Not in setup mode, so can't start presentation");
  },

  endPresentation: function() {
    if (this.get('state') == 'presenting') {
      this.set('state', 'end');
    }
    else
      alert("Not presenting, so can't end presentation");
  },

  // nextTurn: function() {
  //   if (this.get('state') == 'presenting') {
  //     // this.set('turn', this.isPlayerTurn() ? "cpu" : "player");
  //     // At beginning of CPU turn, generate shot
  //     // At beginning of Player turn, waiting for player to fire
  //     // this.set('waiting', this.isPlayerTurn());
  //   }
  // },

});
