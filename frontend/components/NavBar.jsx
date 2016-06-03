var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');

var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    SessionApiUtil.fetchCurrentUser();
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  guestLogin: function(e) {
    e.preventDefault();
    SessionApiUtil.login({username: "Nicole", password: "password"})
  },

  greeting: function () {
    if (SessionStore.isUserLoggedIn()) {
      return (
        <nav className="petsy">
          <img className="favorite-logo h-button" src={favoriteUrl}/>
          <img className="favorite-logo h-button" src={profileUrl} />
          <Link to="/" className="h-button" onClick={SessionApiUtil.logout}>Log out</Link>
          <p className="h-button">Hey, {SessionStore.currentUser().fname}!</p>
        </nav>
      );
    } else if (SessionStore.currentUserHasBeenFetched()) {
      return (
        <nav>
          <Link to="/signup" className="h-button">Register </Link>
          <Link to="/login" className="h-button sign-in">Sign in</Link>
          <a href="#" className="h-button" onClick={this.guestLogin}>Demo User</a>
        </nav>
      );
    } else {
      return (
        <nav/>
      )
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
        <img className="logo" src={petsyUrl}/>
        {this.greeting()}
        </header>
          <nav className="pet-type-nav group">
            <ul className="pet-type-list group">
              <li onClick={this.filterSearch} className="pet-type-item">Dogs</li>
              <li onClick={this.filterSearch} className="pet-type-item">Cats</li>
              <li onClick={this.filterSearch} className="pet-type-item">Birds</li>
              <li onClick={this.filterSearch} className="pet-type-item">Reptiles</li>
              <li onClick={this.filterSearch} className="pet-type-item">Horses</li>
              <li onClick={this.filterSearch} className="pet-type-item">Barnyard</li>
            </ul>
          </nav>
        {this.props.children}
      </div>
    );
  }
});

module.exports = NavBar;
