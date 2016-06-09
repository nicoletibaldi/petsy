var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var SignupForm = require('./SignupForm');
var LoginForm = require('./LoginForm');
var PetForm = require('./PetForm');
var FavoriteApiUtil = require('./../util/favorite_api_util');

var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return({modal: null})
  },

  componentDidMount: function () {
    SessionApiUtil.fetchCurrentUser();
    FavoriteApiUtil.fetchAllFavorites();
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  guestLogin: function(e) {
    e.preventDefault();
    SessionApiUtil.login({username: "Nicole", password: "password"})
  },

  showRegister: function () {
    this.setState({modal: <SignupForm close={this.closeModal}/>})
  },

  showSignUp: function () {
    this.setState({modal: <LoginForm close={this.closeModal}/>})
  },

  showNewPet: function () {
    this.setState({modal: <PetForm close={this.closeModal}/>})
  },

  closeModal: function () {
    this.setState({modal: null})
  },

  goHome: function () {
    this.context.router.push("/");
  },

  favorites: function () {
    this.context.router.push("favorites");
  },

  greeting: function () {
    if (SessionStore.isUserLoggedIn()) {
      return (
        <nav className="petsy">
          <img onClick={this.favorites} className="favorite-logo h-button" src={favoriteUrl}/>
          <Link to="/" className="h-button" onClick={SessionApiUtil.logout}>Log out</Link>
          <p className="greeting">Hey, {SessionStore.currentUser().fname}!</p>
        </nav>
      );
    } else if (SessionStore.currentUserHasBeenFetched()) {
      return (
        <nav className="petsy">
          <button onClick={this.showRegister} className="h-button">Register </button>
          <button onClick={this.showSignUp} className="h-button sign-in">Sign in</button>
          <a href="#" className="h-button" onClick={this.guestLogin}>Demo User</a>
        </nav>
      );
    } else {
      return (
        <nav/>
      )
    }
  },

  createPet: function () {
    if (SessionStore.isUserLoggedIn()) {
      return(
        <div>
        <a href="/#/created_pets" className="create-pet pet-type-item">My listings</a>
        <p onClick={this.showNewPet} className="create-pet pet-type-item">Add a listing</p>
        </div>
      );
    }
  },

  filterSearch: function (e) {
    var petType = e.currentTarget.innerHTML.toLowerCase();
    this.context.router.push("/" + petType);
  },


  render: function () {
    return (
      <div>
        <header>
        <img className="logo" onClick={this.goHome} src={petsyUrl}/>
        {this.greeting()}
        </header>
          <nav className="pet-type-nav group">
            <ul className="pet-type-list group">
              <li onClick={this.filterSearch} className="pet-type-item">Dogs</li>
              <li onClick={this.filterSearch} className="pet-type-item">Cats</li>
              <li onClick={this.filterSearch} className="pet-type-item">Reptiles</li>
              <li onClick={this.filterSearch} className="pet-type-item">Rabbits</li>
              <li onClick={this.filterSearch} className="pet-type-item">Other</li>
            </ul>
        {this.createPet()}
          </nav>
          {this.state.modal}
        {this.props.children}
      </div>
    );
  }
});

module.exports = NavBar;
