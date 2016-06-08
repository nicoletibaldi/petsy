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

  handleSubmit: function () {

  },

  goToDetail: function (event) {
    debugger
    this.context.router.push("/pets/")
  },

  queryChange: function (event) {
    var query = event.target.value;
    this.setState({query: query});
    if (query.length > 0) {
      SearchApiUtil.search(query)
    }
  },

  render: function () {
    var results = SearchStore.all()
    if (results.length > 10) {
      results = SearchStore.all().slice(0, 10);
    }
    var resultLis = results.map(function (result) {
      return(
        <a href={"/#/pets/" + result.id} className="search-result" key={result.id}>{result.name}</a>
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
        <ul className="search-results">
          {resultLis}
        </ul>
      </form>
    );
  }
});

module.exports = Search;
