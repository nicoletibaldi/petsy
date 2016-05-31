var React = require('react');
var Link = require('react-router').Link;
var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var UserApiUtil = require('./../util/user_api_util');

var LoginForm = React.createClass({

  getInitialState: function () {
    return({
      username: "",
      email: "",
      password: "",
      modalVisible: false
    });
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount: function () {
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
    if (this.props.location.pathname === "/login") {
      SessionApiUtil.login(formData);
    } else {
      UserApiUtil.signup(formData);
    }
  },

  formType: function () {
    return this.props.location.pathname.slice(1);
  },

  render: function () {
    var NavLink;
    if (this.formType() === "login") {
      navLink = <Link to="/signup">Sign up instead</Link>;
    } else {
      navLink = <Link to="/login">Log in instead</Link>;
    }

    return (

      <section id="modal" class="modal is-active">
        <article class="modal-content">
          <span class="modal-close js-hide-modal">&times;</span>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <br/>
            <label> Email:
              <input type="text" value={this.state.email} onChange={this.emailChange}/>
            </label>
            <br/>
            <label> Username:
              <input type="text" value={this.state.username} onChange={this.usernameChange}/>
            </label>
            <br/>
            <label> Password:
              <input type="text" value={this.state.password} onChange={this.passwordChange}/>
            </label>
            <br/>
            <input type="submit" value="Submit" />
          </form>
        </article>
      <div class="modal-screen js-hide-modal"></div>
    </section>
    );
  }
});
module.exports = LoginForm;
