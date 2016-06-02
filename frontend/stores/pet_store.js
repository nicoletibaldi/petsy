var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PetConstants = require('../constants/pet_constants');

var PetStore = new Store(AppDispatcher);

var _pets;

PetStore.all = function () {
  var result= _pets.petfinder.pets.pet;
  return result;
};

PetStore.find = function(id) {
  return _pets[id];
};

resetPets = function (newPets) {
  _pets = newPets;

  // for (var i = 0; i < newPets.length; i++) {
  //   _pets[newPets[i].petfinder.pets.pet.i.id.$t] = newPets[i];
  // }
};

PetStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PetConstants.PETS_RECEIVED:
    resetPets(payload.pets);
    PetStore.__emitChange();
    break;

  }
};

module.exports = PetStore;
