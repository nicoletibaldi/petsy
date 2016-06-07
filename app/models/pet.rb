class Pet < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_all_columns, :against => [:name, :animal, :description, :age]

  validates :name, :animal, :description, :sex, :age, presence: true

  has_many :favorites


  has_attached_file :image, default_url: "noimage.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
