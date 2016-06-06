var React = require('react');
var Link = require('react-router').Link;
var PetStore = require('./../stores/pet_store');
var PetApiUtil = require('./../util/pet_api_util');
var NavBar = require('./NavBar');

var PetDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return(
      {
        pet: PetStore.find(this.props.params.petId),
      }
    );
  },

  componentDidMount: function () {
    PetApiUtil.fetchSinglePet(this.props.params.petId);
    this.petDetailListener = PetStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({pet: PetStore.find(this.props.params.petId)});
  },

  componentWillReceiveProps: function (newProps) {
    PetApiUtil.fetchSinglePet(newProps.params.petId);
    this.setState({pet: PetStore.find(newProps.params.petId)})
  },

  componentWillUnmount: function () {
    this.petDetailListener.remove();
  },

  render: function () {
    if (!this.state.pet) {
      return (<div />);
    } else {
      return(
        <div className="pet-detail-container group">
          <div className="pet-detail-photo">
            <img src={this.state.pet.image_url}/>
          </div>
          <ul className="detail-right-box">
            <li>Name: {this.state.pet.name}</li>
            <li>{this.state.pet.animal}</li>
            <li>Sex: {this.state.pet.sex}</li>
            <li>Age: {this.state.pet.age}</li>
            <a href="#" className="checkout">Add to favorites</a>
          </ul>
          <p className="detail-description"> {this.state.pet.description}</p>
        </div>
      );
    }
  }
});

module.exports = PetDetail;
