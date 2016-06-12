var AppDispatcher = require('./../dispatcher/dispatcher');
var SearchConstants = require('./../constants/search_constants');

module.exports = {
  receiveSearchResults: function (results) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RESULTS_RECEIVED,
      results: results
    });
  },

  clearResults: function () {
    AppDispatcher.dispatch({
      actionType: SearchConstants.CLEAR_RESULTS
    });
  }
};
