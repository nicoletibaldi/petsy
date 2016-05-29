# Phases 7 & 8: Favorites, CSS Styling

## Rails
### Models
* favorites

### Controllers
* Api::FavoritesController (create, destroy, index, update)

### Views
* favorites/index.json.jbuilder

## Flux
### Views (React Components)
* FavoritesIndex
  - (PetIndexItem)
    - (PetDetail)
### Stores
* Favorite

### Actions
* ApiActions.receiveAllFavorites -> triggered by ApiUtil
* ApiActions.receiveSingleFavorite
* ApiActions.deleteFavorite
* FavoriteActions.fetchAllFavorites -> triggers ApiUtil
* FavoriteActions.fetchSingleFavorite
* FavoriteActions.createFavorite
* FavoriteActions.destroyFavorite

### ApiUtil
* ApiUtil.fetchAllFavorites
* ApiUtil.fetchSingleFavorite
* ApiUtil.createFavorite
* ApiUtil.destroyFavorite

## Gems/Libraries
