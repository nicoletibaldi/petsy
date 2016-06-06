var SessionActions = require('./../actions/session_actions');
var ErrorActions = require('./../actions/error_actions');

var SessionApiUtil = {
  login: function (credentials) {
    $.ajax({
      url: "/api/session",
      type: "POST",
      data: {user: credentials},
      success: function (currentUser) {
        console.log("Login succcess - SessionApiUtil");
        SessionActions.receiveCurrentUser(currentUser);
      },
      error: function (xhr) {
			  console.log("Login error in SessionApiUtil#login");
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors("login", errors);
			}
    });
  },

  logout: function () {
    $.ajax({
      url: "/api/session",
      method: 'DELETE',
      success: function () {
        console.log("Logout success");
        SessionActions.removeCurrentUser();
      }
    });
  },

  fetchCurrentUser: function (complete) {
    $.ajax({
      url: "/api/session",
      method: "GET",
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        complete();
      }
    });
  }
};

module.exports = SessionApiUtil;
