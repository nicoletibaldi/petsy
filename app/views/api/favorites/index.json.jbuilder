debugger
json.array! @favorites do |favorite|
  json.name favorite.pet.name
  json.animal favorite.pet.animal
  json.sex favorite.pet.sex
  json.age favorite.pet.age
  json.image favorite.pet.image
  json.id favorite.pet.id
  json.image_url asset_path(favorite.pet.image.url)
  json.favorite_id favorite.id
end
