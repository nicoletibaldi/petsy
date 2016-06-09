class AddUserIdToPets < ActiveRecord::Migration
  def change
    add_column :pets, :user_id, :integer
  end
end
