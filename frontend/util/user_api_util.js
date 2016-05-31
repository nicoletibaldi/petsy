var SessionActions = require('./../actions/session_actions');


var UserApiUtil = {
  signup: function (formData) {
    $.ajax({
      url: "/api/user",
      type: "POST",
      dataType: "JSON",
      data: {user: formData},
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      }
    });
  }
};

module.exports = UserApiUtil;
