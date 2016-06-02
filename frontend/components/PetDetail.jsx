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
        size: ""
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

  componentWillUnmount: function () {
    this.petDetailListener.remove();
  },

  setRef: function (e) {
    var image = e.currentTarget;
      if (image.width > image.height) {
         this.setState({size: "landscape"});
      } else {
        this.setState({size: "portrait"});
      }
  },

  render: function () {
    if (!this.state.pet) {
      return (<div />);
    } else {
      return(
        <div>
          <div className="pet-detail-photo">
            <img className={this.state.size} onLoad={this.setRef} src={this.state.pet.media.photos.photo[3].$t}/>
          </div>
          <p>Name: {this.state.pet.name.$t}</p>
          <p>{this.state.pet.animal.$t}</p>
          <p>Sex: {this.state.pet.sex.$t}</p>
          <p>Age: {this.state.pet.age.$t}</p>
        </div>
      );
    }
  }
});

module.exports = PetDetail;
