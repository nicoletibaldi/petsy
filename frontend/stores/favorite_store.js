var Store = require('flux/utils').Store;
var AppDispatcher = require('./../dispatcher/dispatcher');
var FavoriteConstants = require('./../constants/favorite_constants');

var FavoriteStore = new Store(AppDispatcher);

var _favorites = {};

FavoriteStore.all = function () {
  return Object.keys(_favorites).map( function (favoriteId) {
    return _favorites[favoriteId];
  });
};

FavoriteStore.find = function(id) {
  return _favorites[id];
};

resetFavorites = function (newFavorites) {
  _favorites = {};

  for (var i = 0; i < newFavorites.length; i++) {
    _favorites[newFavorites[i].id] = newFavorites[i];
  }
};

addFavorite = function (favorite) {
  _favorites[favorite.id] = favorite;
};

removeFavorite = function (favorite) {
  delete _favorites[favorite.id];
};

FavoriteStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case FavoriteConstants.FAVORITES_RECEIVED:
      resetFavorites(payload.favorites);
      FavoriteStore.__emitChange();
      break;
    case FavoriteConstants.FAVORITE_RECEIVED:
      addFavorite(payload.favorite);
      FavoriteStore.__emitChange();
      break;
    case FavoriteConstants.FAVORITE_REMOVED:
      removeFavorite(payload.favorite);
      FavoriteStore.__emitChange();
      break;
  }
};

module.exports = FavoriteStore;
