json.extract! @pet, :name, :animal, :age, :breed, :contact_email, :description, :sex
json.image_url asset_path(@pet.image.url)
