const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;

const CHANGE_EVENT = 'change';

module.exports = assign({}, EventEmitter.prototype, {

  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }
});
