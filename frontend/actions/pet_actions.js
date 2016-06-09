var Dispatcher = require('../dispatcher/dispatcher');
var PetConstants = require('../constants/pet_constants');

module.exports = {
  receivePets: function (pets) {
    Dispatcher.dispatch({
      actionType: PetConstants.PETS_RECEIVED,
      pets: pets
    });
  },

  receiveSinglePet: function (pet) {
    Dispatcher.dispatch({
      actionType: PetConstants.PET_RECEIVED,
      pet: pet
    });
  },

  removePet: function (pet) {
    Dispatcher.dispatch({
      actionType: PetConstants.PET_REMOVED,
      pet: pet
    });
  }
};
