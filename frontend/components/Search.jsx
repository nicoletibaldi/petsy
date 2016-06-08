var React = require('react');
var SearchStore = require('./../stores/search_store');
var SearchApiUtil = require('./../util/search_api_util');


var Search = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return({results: [], query: ""});
  },

  componentDidMount: function () {
    this.searchListener = SearchStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.searchListener.remove();
  },

  _onChange: function () {
    this.forceUpdate();
  },

  handleClick: function () {

  },

  queryChange: function (event) {
    var query = event.target.value;
    this.setState({query: query});
    if (query.length > 0) {
      SearchApiUtil.search(query)
    }
  },

  render: function () {
    var results = SearchStore.all().map(function (result) {
      return(
        <li>{result.name}</li>
      )
    });
    return(
      <form className="search">
        <input className="search-input" type="text"
          placeholder="Describe your perfect pet!"
          value={this.state.query}
          onChange={this.queryChange}
        />
        <input className="search-button" value="Search" type="submit"/>
        <ul>
          {results}
        </ul>
      </form>
    );
  }
});

module.exports = Search;
