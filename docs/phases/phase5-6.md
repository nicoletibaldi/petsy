# Phases 5 & 6: PetTypes and Tags (2 days)

## Rails
### Models
* PetType
* Tag
* Tagging

### Controllers
* Api::PetTypesController (index, show)

### Views
* pet_types/index.json.jbuilder
* pet_types/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* PetTypesIndex
  - PetTypeIndexItem
* SearchIndex



**Note:** I've been going back and forth on how to accomplish what I am trying to implement with PetTypes. PetTypes will be a sort of "filter" to render a different index, ie: instead of randomly rendered
pets on the homepage, this will show just dogs, or just cats, etc. These categories will be hard coded and can't be updated, created, or destroyed by users. The most I'd ever want to do is fetch pets BY type, most likely from the Pet store
### Stores
* Pet

### Actions
* ApiActions.receiveFilteredPets -> triggered by ApiUtil
* PetActions.fetchFilteredPets -> triggers ApiUtil

### ApiUtil
* ApiUtil.fetchFilteredPets

## Gems/Libraries
