var React = require('react');
var SearchStore = require('./../stores/search_store');
var PetApiUtil = require('./../util/pet_api_util');
var PetIndexItem = require('./PetIndexItem');
var SearchApiUtil = require('./../util/search_api_util');

var SearchResultsIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      pets: []
    });
  },

  componentDidMount: function () {
      var search = this.props.params.query;
      this.searchListener = SearchStore.addListener(this._onChange);
      SearchApiUtil.search(search);
  },

  componentWillUnmount: function () {
    this.searchListener.remove();
  },

  _onChange: function () {
    this.setState({
      pets: SearchStore.all()
    });
  },

  render: function () {
    if (!this.state.pets) {
      return (
        <div>Fetching pets...</div>
      );
    } else {
      return(
        <ul className="pet-index">
          {this.state.pets.map(function (pet) {
            return(
              <PetIndexItem key={pet.id} pet={pet}/>
            );
          })}
        </ul>
      );
    }

  }
});



module.exports = SearchResultsIndex;
