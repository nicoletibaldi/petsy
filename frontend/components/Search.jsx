var React = require('react');
var SearchStore = require('./../stores/search_store');
var SearchApiUtil = require('./../util/search_api_util');


var Search = React.createClass({
  getInitialState: function () {
    return({text: ""});
  },

  render: function () {
    return(
      <form className="search">
      <input className="search-input" type="text"/>
      <input className="search-button" value="Search" type="submit"/>
      </form>
    );
  }
});

module.exports = Search;
