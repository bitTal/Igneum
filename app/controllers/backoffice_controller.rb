require "#{Dir.pwd}/config/utils/index.rb"

class BackofficeController < ApplicationController
	def index
		if request.env['omniauth.auth']
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
			session[:id_user] = @auth[nickname]
			session[:auth_token] = @auth['credentials']['token']
			redirect_to action: "edit"
		end
	end

	def edit
		if !session[:auth_token]
			redirect_to action: "index"
		end
	end

	def add_fire
		if !session[:auth_token]
			redirect_to action: "index"
		end
		@auth = request.env['omniauth.auth']
		@provs = Provincias.all
		@prov = params['provincia'] ? params['provincia'] : '2'
		@municipios = Municipios.where(id_provincia: @prov)

		if params['town'] || params['municipios']
			if params['town']
				@town = params['town']	
			elsif params['municipios']
				@town =  Municipios.where(nombre: params['municipios'])[0]['nombre']
			end

			require('yaml')
			conf = YAML.load_file("#{Dir.pwd}/config/confidencial.yml") 
			@town = normileze_string(@town)
		    open("https://#{conf['cartodb_user']}.cartodb.com/api/v2/sql?q=INSERT INTO frs (town, date, country) VALUES ('#{@town}', now(), 'Spain')&api_key=#{conf['cartodb_api_key']}").read
		end
	end

end
