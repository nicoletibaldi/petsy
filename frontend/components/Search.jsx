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
    this.setState({results: SearchStore.all()})
  },

  handleClick: function () {

  },

  queryChange: function (event) {
    debugger
    if (event.target.value.length > 0) {
      this.setState({query: event.target.value});
    }
  },

  render: function () {
    var results = this.state.results.map(function (result) {
      return(
        <li>result.name</li>
      )
    });
    return(
      <form className="search">
        <input className="search-input" type="text" placeholder="Describe your perfect pet!" value={this.state.query} onChange={this.queryChange}/>
        <input className="search-button" value="Search" type="submit"/>
        <ul>
          {results}
        </ul>
      </form>
    );
  }
});

module.exports = Search;
