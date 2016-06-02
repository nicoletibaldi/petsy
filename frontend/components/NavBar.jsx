var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');

var NavBar = React.createClass({
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
        <nav>
        <img className="favorite-logo h-button" src={favoriteUrl}/>
        <Link to="/" className="h-button" onClick={SessionApiUtil.logout}>Log out</Link>
        <p className="h-button">Hey, {SessionStore.currentUser().username}!</p>
        </nav>
      );
    } else if (SessionStore.currentUserHasBeenFetched()) {
      return (
        <nav>
        <Link to="/signup" className="h-button">Register</Link>
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

  render: function () {
    return (
      <div>
        <header className="petsy-header">
        <img className="logo" src={petsyUrl}/>
          {this.greeting()}
        </header>
          {this.props.children}
      </div>
    );
  }
});

module.exports = NavBar;
