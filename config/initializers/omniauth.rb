require('yaml')
conf = YAML.load_file("#{Dir.pwd}/config/confidencial.yml")

Rails.application.config.middleware.use OmniAuth::Builder do
	provider :google_oauth2, conf['client_id'], conf['client_secret'], {
		scope: 'profile', image_aspect_ratio: 'square', image_size: 48, access_type: 'online'
	}
end