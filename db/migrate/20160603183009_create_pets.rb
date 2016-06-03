class CreatePets < ActiveRecord::Migration
  def change
    create_table :pets do |t|
      t.string :name, null: false
      t.string :animal, null: false
      t.string :age
      t.string :breed
      t.string :contact_email
      t.text :description
      t.string :sex
      t.string :image
      
    end
  end
end
