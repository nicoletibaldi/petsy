Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV["GOOGLE_CLIENT_ID"], ENV["GOOGLE_CLIENT_SECRET"],
    :scope => 'email, profile'

  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET']

end
