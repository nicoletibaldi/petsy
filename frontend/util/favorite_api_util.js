var FavoriteActions = require('./../actions/favorite_actions');
var FavoriteStore = require('./../stores/favorite_store');

FavoriteApiUtil = {

  fetchAllFavorites: function () {
    $.ajax({
      url: "/api/favorites",
      type: "GET",
      dataType: "json",
      success: function (favorites) {
        FavoriteActions.receiveFavorites(favorites);
      }
    });
  },

  addFavorite: function (data) {
    $.ajax({
      url: "/api/favorites",
      type: "POST",
      dataType: "json",
      data: {favorite: data},
      success: function (favorite) {
        FavoriteActions.receiveSingleFavorite(favorite);
      }
    });
  },

  removeFavorite: function (id) {
    $.ajax({
      url: "/api/favorites/" + id,
      type: "DELETE",
      dataType: "json",
      success: function (favorite) {
        FavoriteActions.removeFavorite(favorite);
      }
    });
  }
};

module.exports = FavoriteApiUtil;
