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
    if (this.props.params) {
      var petType = this.props.params.petType;
      PetApiUtil.fetchFilteredPets(petType);
      this.petListener = PetStore.addListener(this._onChange);
    } else {
      PetApiUtil.fetchAllPets();
      this.petListener = PetStore.addListener(this._onChange);
    }
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.params) {
      var petType = newProps.params.petType;
      PetApiUtil.fetchFilteredPets(petType);
    } else {
      PetApiUtil.fetchAllPets();
    }
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
        <ul className="pet-index">
          {this.state.pets.map(function (pet) {
            return(
              <PetIndexItem key={pet.id} pet={pet}/>
            )
          })}
        </ul>
      );
    }

  }
});



module.exports = PetIndex;
