class User < ApplicationRecord
  has_secure_password

  validates :display_name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :password, length: {minimum: 4}

  has_many :posts

  def return_data 
    {
      id: id,
      display_name: display_name,
      email: email,
      created_at: created_at,
      updated_at: updated_at
    }
  end
end


