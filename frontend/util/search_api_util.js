var AppDispatcher = require('./../dispatcher/dispatcher');
var SearchActions = require('./../actions/search_actions');

module.exports = {
  search: function (query) {
    $.ajax({
      type: "GET",
      dataType: "JSON",
      data: {query: query},
      url: "/api/search_pets",
      success: function (results) {
        SearchActions.receiveSearchResults(results);
      },
      error: function () {
        console.log("Error");
      }
    });
  }
};
