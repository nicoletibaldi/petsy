var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PetConstants = require('../constants/pet_constants');

var PetStore = new Store(AppDispatcher);

var _pets = {};



var _dogs = [];

PetStore.all = function () {
  return Object.keys(_pets).map( function(pet))
};

PetStore.resetPets = function () {
  _dogs = [];
};

var dogItem;

PetStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PetConstants.PET_RECEIVED:
      DogStore.resetDogs();
      DogStore.resetOffset(payload.offset)
      payload.dogs.forEach(function (dog) {
        dogItem = {};
        dogItem.id = dog.id.$t;
        dogItem.name = dog.name.$t;
        dogItem.age = dog.age.$t;
        dogItem.size = dog.size.$t;
        dogItem.sex = dog.sex.$t;
        dogItem.breeds = dog.breeds.breed;
        dogItem.city = dog.contact.city.$t;
        dogItem.zipcode = dog.contact.zip.$t;
        dogItem.email = dog.contact.email.$t;
        if (dog.media.photos) {
          dogItem.photos = dog.media.photos.photo;
        }
        dogItem.description = dog.description.$t;
        _dogs.push(dogItem);
      });
      DogStore.__emitChange();


      break;


};

module.exports = PetStore;
