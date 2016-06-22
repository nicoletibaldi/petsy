var React = require('react');
var PetStore = require('./../stores/pet_store');
var PetApiUtil = require('./../util/pet_api_util');
var PetIndexItem = require('./PetIndexItem');
var FavoriteApiUtil = require('./../util/favorite_api_util');

var PetIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
<<<<<<< HEAD
    if (!this.props.params) {
      return ({
        pets: PetStore.all().slice(60, 75)
      });

    } else {
      return ({
        pets: PetStore.all()
      });
    }
=======
    return ({
      pets: PetStore.all()
    });
>>>>>>> 08653a38ca549c6f2dea1c3a4488e4d0145de98d
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
<<<<<<< HEAD
    if (!this.props.params) {
      this.setState({
        pets: PetStore.all().slice(60, 75)
      });
    } else {
      this.setState({
        pets: PetStore.all()
      });
    }
=======
    this.setState({
      pets: PetStore.all()
    });
>>>>>>> 08653a38ca549c6f2dea1c3a4488e4d0145de98d
  },

  render: function () {
    if (!this.state.pets) {
      return(<div></div>);
    }
    if (this.state.pets.length < 1) {
      return (
        <div className="blank-page">
          <img src={noresultsUrl}/>
        </div>
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



module.exports = PetIndex;
