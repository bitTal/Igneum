

class BackofficeController < ApplicationController
	def index
	end

	def edit
		@auth = request.env['omniauth.auth']
		@users = User.all
		nickname = request.env['omniauth.auth']['info']['email'].split('@').first
		exists = @users.select {|user| user.user == nickname } 

		if exists.length === 0
			redirect_to action: "index"
		else 
			if exists[0].user_type != 'S'
				redirect_to action: "index"
			end
		end
	end

	def add_fire
		if params['town']
			require('yaml')
			conf = YAML.load_file("#{Dir.pwd}/config/confidencial.yml") 
		    @town = params['town']
		    open("https://#{conf['cartodb_user']}.cartodb.com/api/v2/sql?q=INSERT INTO frs (town, date, country) VALUES ('#{@town}', now(), 'Spain')&api_key=#{conf['cartodb_api_key']}").read
		end 
	end
end
