require "#{Dir.pwd}/config/utils/index.rb"

class BackofficeController < ApplicationController

	def index
		if session[:user]
			redirect_to action: 'edit'
		end
	end

	def googleAuth
		if request.env['omniauth.auth']
			@auth = request.env['omniauth.auth']
			@users = User.all
			nickname = request.env['omniauth.auth']['info']['email'].split('@').first
			exists = @users.select {|user| user.user == nickname } 

			if exists.length === 0
				redirect_to action: "index"
				return
			else 
				if exists[0].user_type != 'S'
					redirect_to action: "index"
					return
				end
			end
			session[:user] = {}
			session[:user]['id_user'] = nickname
			session[:user]['auth_token'] = @auth['credentials']['token']
			redirect_to action: "edit"
		else redirect_to action: "index"
		end
	end

	def edit
		@a = session[:user]
		if !session[:user]
			redirect_to action: "index"
			return
		end
	end

	def add_fire
		if !session[:user]
			redirect_to action: "index"
			return
		end

		@provs = Provincias.all
		@prov = params['provincia'] ? params['provincia'] : '2'
		@municipios = Municipios.where(id_provincia: @prov)
		@town = flash[:var]
	end

	def create_fire
		if !session[:user]
			redirect_to action: "index"
			return
		end

		if params['town'] || params['municipios']
			if params['town']
				@town = params['town']
			elsif params['municipios']
				@town =  Municipios.where(nombre: params['municipios'])[0]['nombre']
			end

			require 'open-uri'
			require('yaml')
			conf = YAML.load_file("#{Dir.pwd}/config/confidencial.yml") 
			@town = normileze_string(@town)
		    open("https://#{conf['cartodb_user']}.cartodb.com/api/v2/sql?q=INSERT INTO frs (town, date, country) VALUES ('#{@town}', now(), 'Spain')&api_key=#{conf['cartodb_api_key']}").read
			flash[:var] = @town
			
		end
		redirect_to action: 'add_fire'
	end

	def close
		session.delete(:user)
		redirect_to action: 'index'
	end

end
