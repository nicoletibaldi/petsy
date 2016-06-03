json.array! @pets do |pet|
  json.extract! pet, :name, :animal, :age, :breed, :contact_email, :description, :sex, :image, :id
end
