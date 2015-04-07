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

function appendResult(result) {
  data = data.concat(result);
}

// Facebook style store creation.
let SearchResultStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getAll: function() {
    return data;
  },

  getPage: function(start = 0, end = Constants.SEARCH_RESULT_PAGE_SIZE) {
    return data.slice(start, end);
  },

  getResultCount: function() {
    return data.size;
  },

  getNumPages: function(pageSize = Constants.SEARCH_RESULT_PAGE_SIZE) {
    const total = this.getResultCount();
    let numPages = Math.floor(total / pageSize);
    if (!(total % pageSize)) {
      numPages -= 1
    }
    return numPages;
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;
    switch(action.type) {
      case Constants.ActionTypes.ADD_SEARCH_RESULT:
        appendResult(action.result);
        SearchResultStore.emitChange();
        break;
    }
  })

});

module.exports = SearchResultStore;
