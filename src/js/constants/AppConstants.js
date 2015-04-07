const keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    ADD_SEARCH_RESULT: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  TOOL_URL: "http://www.elitetradingtool.co.uk",

  SEARCH_RESULT_PAGE_SIZE: 50

};
