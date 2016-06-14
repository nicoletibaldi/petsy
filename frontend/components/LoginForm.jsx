var React = require('react');
var Link = require('react-router').Link;
var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var UserApiUtil = require('./../util/user_api_util');
var ErrorStore = require('./../stores/error_store');
var ErrorActions = require('./../actions/error_actions');


var LoginForm = React.createClass({

  getInitialState: function () {
    return({
      username: "",
      password: "",
    });
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  redirectIfLoggedIn: function () {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

  handleModalClick: function () {
      ErrorActions.clearErrors();
      this.props.close();
  },

  stopProp: function (e) {
    e.stopPropagation();
  },

  usernameChange: function (event) {
    var newUsername = event.target.value;
    this.setState({username: newUsername});
  },

  passwordChange: function (event) {
    var newPassword = event.target.value;
    this.setState({password: newPassword});
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var formData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
      SessionApiUtil.login(formData, this.handleModalClick);
  },

  baseErrors: function (field) {
    var errors = ErrorStore.formErrors("login");
    if (!errors["base"]) { return; }

    var messages = errors["base"].map(function (errorMsg, i) {
      return <li className="errors" key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  google: function () {
    this.context.router.push("/auth/google_oauth2");
  },

  render: function () {
    return (
        <div className="modal" onClick={this.handleModalClick}>
          <form className="login-form log-in"
            onSubmit={this.handleSubmit}
            onEnter={this.handleSubmit}
            onClick={this.stopProp}
          >
          <div className="oauth">
          <a href="/auth/google_oauth2" onClick={this.handleModalClick}>
          <img src={googleUrl} className="google" />
          </a><br/>
          <a href="/auth/facebook" onClick={this.handleModalClick}>
          <img src={facebookUrl} className="facebook"/>
          </a>
          </div>
          <br/>
          <br/>
          { this.baseErrors("username") }
            <br/>
            <label> Username<br/>
              <input type="text" value={this.state.username} onChange={this.usernameChange}/>
            </label>
            <br/>
            <label> Password<br/>
              <input type="password" value={this.state.password} onChange={this.passwordChange}/>
            </label>
            <br/>
            <input type="submit" value="Sign in" className="login-button" />
          </form>
        </div>
    );
  }
});
module.exports = LoginForm;
