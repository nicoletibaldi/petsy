var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var SessionStore = require('./stores/session_store');
var SessionApiUtil = require('./util/session_api_util');

var App = require('./components/App');
var PetIndex = require('./components/PetIndex');
var LoginForm = require('./components/LoginForm');
var SignupForm = require('./components/SignupForm');
var PetDetail = require('./components/PetDetail');
var NavBar = require('./components/NavBar');
var PetForm = require('./components/PetForm');
var FavoriteIndex = require('./components/FavoriteIndex');

var router = (
  <Router history={hashHistory}>
    <Route path="/" component={NavBar}>
      <IndexRoute component={App}/>
      <Route path="pets/:petId" component={PetDetail} />
      <Route path="new" component={PetForm} onEnter={_ensureLoggedIn}/>
      <Route path="favorites" component={FavoriteIndex}/>
      <Route path=":petType" component={PetIndex} />
    </Route>
  </Router>
);

function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn () {
    if (!SessionStore.isUserLoggedIn()) {
      replace('/');
    }

    asyncDoneCallback();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('content');
  ReactDOM.render(router, root);
});
