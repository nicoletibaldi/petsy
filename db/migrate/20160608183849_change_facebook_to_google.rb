class ChangeFacebookToGoogle < ActiveRecord::Migration
  def change
    rename_column :users, :facebook_uid, :google_uid
  end
end
