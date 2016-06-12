json.array! @pets do |pet|
  json.extract! pet, :name, :animal, :age, :breed, :contact_email,
    :description, :sex, :id, :user_id
  json.image_url asset_path(pet.image.url)
end
