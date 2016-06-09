var React = require('react');
var PetStore = require('./../stores/pet_store');
var PetApiUtil = require('./../util/pet_api_util');
var PetIndexItem = require('./PetIndexItem');
var SessionStore = require('./../stores/session_store');

var CreatedIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      pets: PetStore.createdPets(SessionStore.currentUser().id)
    });
  },

  componentDidMount: function () {
      PetApiUtil.fetchCreatedPets();
      this.petListener = PetStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (newProps) {
      PetApiUtil.fetchCreatedPets(SessionStore.currentUser().id);
  },

  componentWillUnmount: function () {
    this.petListener.remove();
  },

  _onChange: function () {
    this.setState({
      pets: PetStore.createdPets(SessionStore.currentUser().id)
    });
  },

  editPet: function (event) {
    
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
              <div>
              <PetIndexItem key={pet.id} pet={pet}/>
              <p value={pet.id} onClick={this.editPet}>Edit</p>
              </div>
            )
          })}
        </ul>
      );
    }

  }
});



module.exports = CreatedIndex;
