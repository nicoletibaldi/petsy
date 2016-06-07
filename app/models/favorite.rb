class Favorite < ActiveRecord::Base
  belongs_to :user
  validates :user_id, :pet_id, presence: true

end
