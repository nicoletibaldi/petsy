# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Pet Cycles

### Pets API Request Actions

* `fetchAllPets`
  0. invoked from `PetsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/pets` is called.
  0. `receiveAllPets` is set as the callback.

* `createPet`
  0. invoked from new pet button `onClick`
  0. `POST /api/pets` is called.
  0. `receiveSinglePet` is set as the callback.

* `fetchSinglePet`
  0. invoked from `PetDetail` `didMount`/`willReceiveProps`
  0. `GET /api/pets/:id` is called.
  0. `receiveSinglePet` is set as the callback.

* `updatePet`
  0. invoked from `PetForm` `onSubmit`
  0. `POST /api/pets` is called.
  0. `receiveSinglePet` is set as the callback.

* `destroyPet`
  0. invoked from delete pet button `onClick`
  0. `DELETE /api/pets/:id` is called.
  0. `removePet` is set as the callback.

**Note:** Wondering if this is correct implementation
* `fetchFilteredPets`
  0. invoked from pet type link `onClick`
  0. `GET/api/pets/:id` is called.
  0. `receiveFilteredPets` is set as the callback.


### Pets API Response Actions

* `receiveAllPets`
  0. invoked from an API callback.
  0. `Pet` store updates `_pets` and emits change.

* `receiveSinglePet`
  0. invoked from an API callback.
  0. `Pet` store updates `_pets[id]` and emits change.

* `removePet`
  0. invoked from an API callback.
  0. `Pet` store removes `_pets[id]` and emits change.


**Note:** Wondering if this is correct implementation
* `receiveFilteredPets`
  0. invoked from an API callback.
  0. `Pet` store updates `_pets` and emits change.

### Store Listeners

* `PetsIndex` component listens to `Pet` store.
* `PetDetail` component listens to `Pet` store.
* `PetTypeIndexItem` component listents to `Pet` store.

## Favorite Cycles

### Favorites API Request Actions

* `fetchAllFavorites`
  0. invoked from `FavoritesIndex` `didMount`/`willReceiveProps`
  0. `GET /api/favorites` is called.
  0. `receiveAllFavorites` is set as the callback.

* `createFavorite`
  0. invoked from new favorite button `onClick`
  0. `POST /api/favorites` is called.
  0. `receiveAllFavorites` is set as the callback.

* `destroyFavorite`
  0. invoked from remove favorite button `onClick`
  0. `DELETE /api/favorites/:id` is called.
  0. `removeFavorite` is set as the callback.

### Favorites API Response Actions

* `receiveAllFavorites`
  0. invoked from an API callback.
  0. `Favorite` store updates `_favorites` and emits change.

* `removeFavorite`
  0. invoked from an API callback.
  0. `Favorite` store removes `_favorites[id]` and emits change.

### Store Listeners

* `FavoritesIndex` component listens to `Favorite` store.

## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `PetSearchBar` `onChange` when there is text
  0. `GET /api/pets` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `PetSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
