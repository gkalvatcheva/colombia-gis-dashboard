'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var MapActions = require('../actions/mapActions.js');


module.exports = Reflux.createStore({

  listenables: MapActions,

  onChangeBounds: function(newBounds) {
    this.update({ bounds: newBounds });
  },

  onChangeBoundsUser: function(newBounds) {
    this.update({ bounds: newBounds }, { silent: true });
  },

  onChangeBaseMap:function(newBaseMap){
    this.update({baseMap:newBaseMap});
  },

  update: function(assignable, options) {
    options = options || {};
    this.state = assign(this.state, assignable);
    if (!options.silent) {
      this.trigger(this.state);
    }
  },

  getInitialState: function() {
    return (this.state = {
      baseMap : 'Gray',
      bounds: [ [61, 195],
                [-24, 20] ]
    });
  }

});
