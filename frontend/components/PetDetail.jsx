var React = require('react');
var Link = require('react-router').Link;
var PetStore = require('./../stores/pet_store');
var PetApiUtil = require('./../util/pet_api_util');
var NavBar = require('./NavBar');
var FavoriteApiUtil = require('./../util/favorite_api_util');
var SessionStore = require('./../stores/session_store');
var FavoriteStore = require('./../stores/favorite_store');


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

  componentWillReceiveProps: function (newProps) {
    PetApiUtil.fetchSinglePet(newProps.params.petId);
    this.setState({pet: PetStore.find(newProps.params.petId)})
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

  sendEmail: function () {
    var mailto_link = 'mailto:' + this.state.pet.contact_email + '?subject=' + this.state.pet.name;
    window.location = mailto_link
  },

  addFavorite: function () {
    var userid = SessionStore.currentUser().id;
    var petid = this.state.pet.id;
    FavoriteApiUtil.addFavorite({user_id: userid, pet_id: petid});
    this.context.router.push("/favorites"); //pass as callback and use callback && callback(); in api util
  },

  removeFavorite: function () {
    var petid = this.state.pet.id;
    FavoriteApiUtil.removeFavorite(petid);
    this.context.router.push("/favorites");
  },

  checkIfFavorite: function (id) {
    var favorites = FavoriteStore.all();
    if (favorites.hasOwnProperty(id)) {
      return <p onClick={this.addFavorite} className="favorites">Add to favorites</p>
    } else {
      return <p onClick={this.removeFavorite} className="favorites remove">Remove from favorites</p>
    }
  },

  render: function () {
    if (SessionStore.isUserLoggedIn()) {
      var addFavorites = this.checkIfFavorite();

    };
    if (!this.state.pet) {
      return (<div />);
    } else {
      return(
        <div className="pet-detail-container group">
          <div className="pet-detail-left">
            <div className="pet-detail-photo">
              <img src={this.state.pet.image_url} className={this.state.size} onLoad={this.setRef} />
            </div>
            <p className="detail-description"> {this.state.pet.description}</p>
          </div>
            <ul className="checkout-box">
              <li>Name: {this.state.pet.name}</li>
              <li>{this.state.pet.animal}</li>
              <li>Sex: {this.state.pet.sex}</li>
              <li>Age: {this.state.pet.age}</li>
              <div className="checkout">
                  {addFavorites}<br/>
                  <p onClick={this.sendEmail} className="favorites email">Contact owner/rescue</p>
              </div>
            </ul>
        </div>
      );
    }
  }
});

module.exports = PetDetail;
