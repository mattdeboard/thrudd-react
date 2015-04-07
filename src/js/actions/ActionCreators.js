var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  addSearchResult: function(result) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_SEARCH_RESULT,
      result: result,
    });
  },

  clearSearchResults: function() {
    console.warn('clearList action not yet implemented...');
  }
};
