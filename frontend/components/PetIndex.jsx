var React = require('react');
var PetStore = require('./../stores/pet_store');
var PetApiUtil = require('./../util/pet_api_util');
var PetIndexItem = require('./PetIndexItem');

var PetIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      pets: PetStore.all()
    });
  },

  componentDidMount: function () {
    PetApiUtil.fetchRandomPets();
    this.petListener = PetStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.petListener.remove();
  },

  _onChange: function () {
    this.setState({
      pets: PetStore.all()
    });
  },

  render: function () {
    if (!this.state.pets) {
      return (
        <div>Fetching pets...</div>
      )
    } else {
      return(
        <ul>
          {this.state.pets.map(function (pet) {
            return(
              <PetIndexItem key={pet.id.$t} pet={pet}/>
            )
          })}
        </ul>
      );
    }

  }
});



module.exports = PetIndex;
