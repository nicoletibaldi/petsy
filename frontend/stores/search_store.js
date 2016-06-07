var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SearchConstants = require('../constants/search_constants');

var SearchStore = new Store(AppDispatcher);

var _searchResults = [];

SearchStore.all = function () {
  return _searchResults;
};

resetSearchResults = function (newSearchResults) {
  _searchResultss = newSearchResults;
};

SearchStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SearchConstants.RESULTS_RECEIVED:
      resetSearchResults(payload.results);
      SearchStore.__emitChange();
      break;
  }
};

module.exports = SearchStore;
