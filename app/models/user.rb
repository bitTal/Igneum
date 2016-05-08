class User < ActiveRecord::Base
	user.url = auth_hash['info']['urls'][user.provider.capitalize]
end
