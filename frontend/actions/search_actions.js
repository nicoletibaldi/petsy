var AppDispatcher = require('./../dispatcher/dispatcher');
var SearchConstants = require('./../constants/search_constants');

module.exports = {
  receiveSearchResults: function (results) {
    Dispatcher.dispatch({
      actionType: SearchConstants.RESULTS_RECEIVED,
      results: results
    });
  }
};
