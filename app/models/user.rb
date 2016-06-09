class User < ActiveRecord::Base
  # attr_reader :password_digest
  attr_reader :password

  has_many :favorites

  validates :session_token, :email, :fname, :lname, presence: true
  validates :username, uniqueness: true, allow_nil: true
  validates :password, length: {minimum: 6}, allow_nil: true

  validates :username, :password_digest, presence: true,
    unless: Proc.new{ |user| user.google_uid || user.facebook_uid }

  validates :google_uid, uniqueness: true, allow_nil: true
  validates :facebook_uid, uniqueness: true, allow_nil: true

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
    if auth_hash[:provider] == "facebook"
      user = User.find_by(facebook_uid: auth_hash[:uid])

      name = auth_hash[:info][:name].split(" ")
      if user.nil?
        user = User.create!(facebook_uid: auth_hash[:uid],
                              fname: name[0],
                              lname: name[-1],
                              email: auth_hash[:info][:email],
                              )
      end
    else
      user = User.find_by(google_uid: auth_hash[:uid])

      if user.nil?
        user = User.create!(google_uid: auth_hash[:uid],
                              fname: auth_hash[:info][:first_name],
                              lname: auth_hash[:info][:last_name],
                              email: auth_hash[:info][:email],
                              )
      end
    end
    user
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
