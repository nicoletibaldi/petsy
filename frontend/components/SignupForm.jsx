var React = require('react');
var Link = require('react-router').Link;
var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var UserApiUtil = require('./../util/user_api_util');
var ErrorStore = require('./../stores/error_store');


var SignupForm = React.createClass({

  getInitialState: function () {
    return({
      username: "",
      email: "",
      password: "",
      modalToggle: false
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

  modalVisible: function () {
    this.setState({modalVisible: true});
  },

  emailChange: function (event) {
    var newEmail = event.target.value;
    this.setState({email: newEmail});
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
      UserApiUtil.signup(formData);
  },

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors(this.props.location.pathname.slice(1));
    if (!errors[field]) { return; }

    var messages = errors[field].map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  render: function () {
    return (
          <form className="login-form" onSubmit={this.handleSubmit}>
            <br/>
            <label> Email<br/>
            { this.fieldErrors("email") }
              <input type="text" value={this.state.email} onChange={this.emailChange}/>
            </label>
            <br/>
            <label> Username<br/>
            { this.fieldErrors("username") }
              <input type="text" value={this.state.username} onChange={this.usernameChange}/>
            </label>
            <br/>
            <label> Password<br/>
            { this.fieldErrors("password") }
              <input type="password" value={this.state.password} onChange={this.passwordChange}/>
            </label>
            <br/>
            <input type="submit" value="Submit" className="login-button" />
          </form>
    );
  }
});
module.exports = SignupForm;
