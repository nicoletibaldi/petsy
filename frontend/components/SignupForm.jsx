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
      fname: "",
      lname: ""
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

  fnameChange: function (event) {
      var newFname = event.target.value;
      this.setState({fname: newFname});
  },

  lnameChange: function (event) {
    var newLname = event.target.value;
    this.setState({lname: newLname});
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var formData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      fname: this.state.fname,
      lname: this.state.lname
    };
      UserApiUtil.signup(formData);
  },

  handleModalClick: function () {
    this.context.router.push("/");
  },

  stopProp: function (e) {
    e.stopPropagation();
  },

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors(this.props.location.pathname.slice(1));
    if (!errors[field]) { return; }

    var messages = errors[field].map(function (errorMsg, i) {
      return <li className="errors" key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  render: function () {
    return (
      <div className="modal" onClick={this.handleModalClick}>
        <form className="login-form" onSubmit={this.handleSubmit} onEnter={this.handleSubmit} onClick={this.stopProp}>
            <br/>
            <label>First name<br/>
            { this.fieldErrors("fname") }
              <input type="text" value={this.state.fname} onChange={this.fnameChange}/>
            </label>
            <br/>
            <label>Last name<br/>
            { this.fieldErrors("lname") }
              <input type="text" value={this.state.lname} onChange={this.lnameChange}/>
            </label>
            <br/>
            <label> Email<br/>
            { this.fieldErrors("email") }
              <input type="text" value={this.state.email} onChange={this.emailChange}/>
            </label>
            <br/>
            <label> Password<br/>
            { this.fieldErrors("password") }
            <input type="password" value={this.state.password} onChange={this.passwordChange}/>
            </label>
            <br/>
            <label> Username<br/>
            { this.fieldErrors("username") }
              <input type="text" value={this.state.username} onChange={this.usernameChange}/>
            </label>
            <br/>
            <input type="submit" value="Register" className="login-button" />
          </form>
        </div>
    );
  }
});
module.exports = SignupForm;
