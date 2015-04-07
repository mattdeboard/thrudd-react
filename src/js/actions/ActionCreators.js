var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  addSearchResults: function(results) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_SEARCH_RESULTS,
      results: results
    });
  },

  clearSearchResults: function() {
    console.warn('clearList action not yet implemented...');
  }
};
