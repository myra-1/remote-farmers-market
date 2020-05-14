class Post < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tags, dependent: :destroy
  #, dependent: :destroy could be removed//optional - will leave for now but might remove later
  # validates :title, presence: true, length: { minimum: 1}
end
