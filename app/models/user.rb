class User < ActiveRecord::Base
  # attr_reader :password_digest
  attr_reader :password

  has_many :favorites

  validates :session_token, :email, :fname, :lname, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true

  validates :username, :password_digest, presence: true,
    unless: Proc.new{ |user| user.google_uid }

  validates :google_uid, presence: true, uniqueness: true,
    unless: Proc.new{ |user| user.username }

  after_initialize :ensure_session_token

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(google_uid: auth_hash[:uid])

    if user.nil?
      user = User.create!(google_uid: auth_hash[:uid],
                            fname: auth_hash[:info][:first_name],
                            lname: auth_hash[:info][:last_name],
                            email: auth_hash[:info][:email],
                          )
    end

    user
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
