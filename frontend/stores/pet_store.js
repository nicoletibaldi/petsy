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

PetStore.createdPets = function (id) {
  var result = [];
  Object.keys(_pets).forEach( function (petId) {
    if (_pets[petId].user_id === id) {
      result.push(_pets[petId]);
    }
  });
  return result;
};

PetStore.find = function(id) {
  return _pets[id];
};

resetPets = function (newPets) {
  _pets = {};

  var petsArr= newPets;
  for (var i = 0; i < petsArr.length; i++) {
    _pets[petsArr[i].id] = petsArr[i];
  }
};

addPet = function (pet) {
  _pets[pet.id] = pet;
};

PetStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PetConstants.PETS_RECEIVED:
      resetPets(payload.pets);
      PetStore.__emitChange();
      break;
    case PetConstants.PET_RECEIVED:
      addPet(payload.pet);
      PetStore.__emitChange();
      break;
  }
};

module.exports = PetStore;
