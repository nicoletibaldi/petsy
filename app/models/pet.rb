class Pet < ActiveRecord::Base
  validates :name, :animal, presence: true

  has_attached_file :image, default_url: "noimage.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
