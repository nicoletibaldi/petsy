var FavoriteConstants = require('./../constants/favorite_constants.js');
var Dispatcher = require('./../dispatcher/dispatcher');

module.exports = {
  receiveSingleFavorite: function (favorite) {
    Dispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITE_RECEIVED,
      favorite: favorite
    });
  },

  receiveFavorites: function (favorites) {
    Dispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITES_RECEIVED,
      favorites: favorites
    });
  },

  removeFavorite: function (favorite) {
    Dispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITE_REMOVED,
      favorite: favorite
    });
  }

};
