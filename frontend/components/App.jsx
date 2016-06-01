var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('./../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');

var App = React.createClass({
  componentDidMount: function () {
    SessionApiUtil.fetchCurrentUser();
    SessionStore.addListener(this.forceUpdate.bind(this));
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
          <img className="ursa" src={ursaUrl}/>
      </div>
    );
  }
});

module.exports = App;
