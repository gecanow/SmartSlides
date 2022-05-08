var Cursor = Backbone.Model.extend({
  defaults: {
    screenPosition: [0, 0]
  },
  setScreenPosition: function(position) {
    this.set('screenPosition', position.slice(0));
  }
});

var Mouse = Backbone.Model.extend({
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

});
