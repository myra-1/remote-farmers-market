class Post < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tags

  # validates :title, presence: true, length: { minimum: 1}
end
