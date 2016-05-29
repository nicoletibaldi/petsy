# Phases 3 & 4: Flux Architecture Pet CRUD, CSS styling (2.5 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* PetsIndex
  - PetsIndexItem
* PetForm

### Stores
* Pet

### Actions
* ApiActions.receiveAllPets -> triggered by ApiUtil
* ApiActions.receiveSinglePet
* ApiActions.deletePet
* PetActions.fetchAllPets -> triggers ApiUtil
* PetActions.fetchSinglePet
* PetActions.createPet
* PetActions.editPet
* PetActions.destroyPet

### ApiUtil
* ApiUtil.fetchAllPets
* ApiUtil.fetchSinglePet
* ApiUtil.createPet
* ApiUtil.editPet
* ApiUtil.destroyPet

## Gems/Libraries
* Flux Dispatcher (npm)
