class RenameImageinPets < ActiveRecord::Migration
  def change
    rename_column :pets, :image, :image_url

  end
end
