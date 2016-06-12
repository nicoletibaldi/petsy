var React = require('react');
var Link = require('react-router').Link;
var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var UserApiUtil = require('./../util/user_api_util');
var ErrorStore = require('./../stores/error_store');
var ErrorActions = require('./../actions/error_actions');



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
    UserApiUtil.signup(formData, this.handleModalClick);
  },

  handleModalClick: function () {
    ErrorActions.clearErrors();
    this.props.close();
  },

  stopProp: function (e) {
    e.stopPropagation();
  },

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors("signup");
    var array = [1, 2, 3, 4, 5]
    if (!errors[field]) {
      var messages = array.map(function (i) {
        return <li className="errors" key={i}/>
      });
    } else {
      var messages = errors[field].map(function (errorMsg, i) {
        return <li className="errors" key={ i }>{ errorMsg }</li>;
      });
    }

    return <ul>{ messages }</ul>;
  },

  render: function () {
    return (
      <div className="modal" onClick={this.handleModalClick}>
        <form className="login-form group" onSubmit={this.handleSubmit} onEnter={this.handleSubmit} onClick={this.stopProp}>
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
            <label>First name<br/>
            <input type="text" className="form-input" value={this.state.fname} onChange={this.fnameChange}/>
            { this.fieldErrors("fname") }
            </label>
            <br/>
            <label>Last name<br/>
            <input type="text" className="form-input" value={this.state.lname} onChange={this.lnameChange}/>
            { this.fieldErrors("lname") }
            </label>
            <br/>
            <label> Email<br/>
            <input type="text" className="form-input" value={this.state.email} onChange={this.emailChange}/>
            { this.fieldErrors("email") }
            </label>
            <br/>
            <label> Password<br/>
            <input type="password" className="form-input" value={this.state.password} onChange={this.passwordChange}/>
            { this.fieldErrors("password") }
            </label>
            <br/>
            <label> Username<br/>
            <input type="text" className="form-input" value={this.state.username} onChange={this.usernameChange}/>
            { this.fieldErrors("username") }
            </label>
            <br/>
            <br/>
            <input type="submit" value="Register" className="login-button" />
          </form>
        </div>
    );
  }
});
module.exports = SignupForm;
