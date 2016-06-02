var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PetConstants = require('../constants/pet_constants');

var PetStore = new Store(AppDispatcher);

var _pets = {};

PetStore.all = function () {
  return Object.keys(_pets).map( function (petId) {
    return _pets[petId];
  });
};

PetStore.find = function(id) {
  return _pets[id];
};

resetPets = function (newPets) {
  _pets = {};

  var petsArr= newPets.petfinder.pets.pet;
  for (var i = 0; i < petsArr.length; i++) {
    _pets[petsArr[i].id.$t] = petsArr[i];
  }
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
