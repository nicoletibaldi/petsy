class Pet < ActiveRecord::Base
  validates :name, :animal, presence: true

end
