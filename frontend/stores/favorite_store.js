var Store = require('flux/utils').Store;
var AppDispatcher = require('./../dispatcher/dispatcher');
var FavoriteConstants = require('./../constants/favorite_constants');

var FavoriteStore = new Store(AppDispatcher);

var _favorites = [];

FavoriteStore.allFavorites = function () {
  return _favorites;
};

FavoriteStore.resetFavorites = function (favorites) {
  _favorites = favorites;
};

FavoriteStore.addFavorite = function (favorite) {
  _favorites.push(favorite);
};

FavoriteStore.removeFavorite = function (favorite) {
  var id = _favorites.indexOf(favorite);
  _favorites.splice(id, 1);
};

FavoriteStore.findFavoriteID = function (dogId) {
  for (var i = 0; i < _favorites.length; i ++) {
    if (_favorites[i].dog_id === parseInt(dogId)) {
      return _favorites[i].id;
    }
  }
};

FavoriteStore.isFavorite = function (dogId) {
  if (!_favorites) {
    return false;
  }
  for (var i = 0; i < _favorites.length; i ++) {
    if (_favorites[i].dog_id === parseInt(dogId)) {
      return true;
    }
  }
  return false;
};



FavoriteStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case FavoriteConstants.FAVORITE_RECEIVED:
      FavoriteStore.addFavorite(payload.favorite);
      FavoriteStore.__emitChange();
      break;
    case FavoriteConstants.FAVORITES_RECEIVED:
      FavoriteStore.resetFavorites(payload.favorites);
      FavoriteStore.__emitChange();
      break;
    case FavoriteConstants.FAVORITES_REMOVED:
      FavoriteStore.removeFavorite(payload.favorite);
      FavoriteStore.__emitChange();
      break;

  }
};


module.exports = FavoriteStore;
