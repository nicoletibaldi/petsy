var React = require('react');
var PetStore = require('./../stores/pet_store');
var PetApiUtil = require('./../util/pet_api_util');
var PetIndexItem = require('./PetIndexItem');
var SessionStore = require('./../stores/session_store');
var PetEdit = require('./PetEdit');

var CreatedIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      pets: PetStore.createdPets(SessionStore.currentUser().id),
      modal: null
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

  closeModal: function () {
    this.setState({modal: null});
  },

  showEdit: function (e) {
    var petId = e.currentTarget.value;
    this.setState({modal: <PetEdit id={petId} close={this.closeModal}/>});
  },

  deleteListing: function (e) {
    var petId = e.currentTarget.value;
    PetApiUtil.deletePet(petId);
    this.context.router.push("/created_pets");
  },

  _onChange: function () {
    this.setState({
      pets: PetStore.createdPets(SessionStore.currentUser().id),
      modal: null
    });
  },

  render: function () {
    if (!this.state.pets) {
      return(<div></div>);
    }
    if (this.state.pets.length < 1) {
      return (
        <div className="blank-page">
          <img src={nolistingsUrl}/>
        </div>
      );
    } else {
      var el = this;
      return(
        <div>
        {this.state.modal}
        <ul className="pet-index">
          {this.state.pets.map(function (pet) {
            return(
              <div className="created-pet" key={pet.id}>
                <PetIndexItem pet={pet}/>
                <p className="login-button er" value={pet.id} onClick={el.showEdit}>Edit</p>
                <p className="login-button er" value={pet.id} onClick={el.deleteListing}>Remove</p>
              </div>
            );
          })}
        </ul>
        </div>
      );
    }

  }
});



module.exports = CreatedIndex;
