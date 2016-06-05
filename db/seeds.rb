require "rest-client"
require "json"
Pet.destroy_all
# cities = File.readlines("./US_zips.txt").map { |line| line.split("  ") }
# zip_codes = cities.map { |city| city[1] }

# my_key = "XXXXXXXXX"
url_base = "http://api.petfinder.com/pet.find?"

# zip_codes.each do |zip|
  querystring_opts = {
    key: "8702fd94d045acb703444d0f1969212c",
    count: 100, # Make sure your account allows this many.
    output: "full",
    format: "json",
    location: 11101
  }
  url = url_base + URI.encode_www_form(querystring_opts)

  pets_json = RestClient.get(url)
  petfinder_object = JSON.parse(pets_json)
  pets = petfinder_object["petfinder"]["pets"]["pet"]

   pets.each do |pet_hash|
     name = pet_hash["name"]["$t"]
     animal = pet_hash["animal"]["$t"]
     age = pet_hash["age"]["$t"]
     breed = pet_hash["breeds"]["breed"]
     if breed.is_a?(Array)
       breed = breed[0]["$t"]
     else
       breed = breed['$t']
     end
     contact_email = pet_hash["contact"]["email"]["$t"]
     description = pet_hash["description"]["$t"]
     sex = pet_hash["sex"]["$t"]
     if pet_hash["media"]["photos"]
       image_url = pet_hash["media"]["photos"]["photo"][3]["$t"]
     else
       image_url = "no image"
     end
     
     newPet = Pet.new({name: name, animal: animal,
       age: age, breed: breed, contact_email: contact_email, description: description,
       sex: sex, image: open(image_url)})
     newPet.save!
  end
# end
