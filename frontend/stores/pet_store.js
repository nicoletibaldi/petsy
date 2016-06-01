var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PetConstants = require('../constants/pet_constants');

var PetStore = new Store(AppDispatcher);

var _pets = {};

PetStore.all = function () {
  return Object.keys(_pets).map( function(pet) {
    return _pets[pet];
  });
};

PetStore.resetPets = function (newPets) {
  _pets = {};

  for (var i = 0; i < newPets.length; i++) {
    _pets[newPets[i].id] = newPets[i];
  }
};

// PetStore.__onDispatch = function (payload) {
//   switch (payload.actionType) {
//     case PetConstants.PET_RECEIVED:
//
//
//
// };

module.exports = PetStore;
