var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PetConstants = require('../constants/pet_constants');

var PetStore = new Store(AppDispatcher);

var _pets = {};

module.exports = PetStore;
