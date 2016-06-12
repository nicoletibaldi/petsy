class AddFacebookToUsers < ActiveRecord::Migration
  def change
    add_column :users, :facebook_uid, :string
  end
end
