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
    this.setState(PetApiUtil.fetchSinglePet(this.props.params.petId));
    this.petDetailListener = PetStore.addListener(this._onChange);
  },

  setRef: function (e) {
    var image = e.currentTarget;
      console.log(image.width);
      console.log(image.height);
      if (image.width > image.height) {
         this.setState({size: "landscape"});
      } else {
        this.setState({size: "portrait"});
      }
  },

  render: function () {
    //onClick of div (make it a link?) do this.showDetail
    return(
      <div>
      <NavBar />
        <div>
          <img className={this.state.size} onLoad={this.setRef} src={this.state.pet.media.photos.photo[3].$t}/>
        </div>
        <p>Name: {this.state.pet.name.$t}</p>
        <p>{this.state.pet.animal.$t}</p>
        <p>Sex: {this.state.pet.sex.$t}</p>
        <p>Age: {this.state.pet.age.$t}</p>
      </div>
    );
  }
});

module.exports = PetDetail;
