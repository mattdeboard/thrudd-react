const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const Immutable = require('immutable');
const assign = require('object-assign');

// data storage
let data = Immutable.List();

// add private functions to modify data
function replaceResults(results) {
  data = Immutable.List.of(results);
}

function addResults(results) {
  data = data.concat(results);
}

// Facebook style store creation.
let SearchResultStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getAll: function() {
    return data;
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;
    switch(action.type) {
      case Constants.ActionTypes.ADD_SEARCH_RESULTS:
        addResults(action.results);
        SearchResultStore.emitChange();
        break;
    }
  })

});

module.exports = SearchResultStore;
