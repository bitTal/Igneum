require "#{Dir.pwd}/config/utils/index.rb"

class BackofficeController < ApplicationController
	require 'open-uri'
	require('yaml')
	@@conf = YAML.load_file("#{Dir.pwd}/config/confidencial.yml") 

	def index
		if session[:user]
			if params['logout']
				session.delete(:user)
				redirect_to action: 'index'
			else
				redirect_to action: 'edit'
			end
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

		@town = flash[:town]
		@province = flash[:province]
	end

	def create_fire
		if !session[:user]
			redirect_to action: "index"
			return
		end

		if params['municipios'] && params['provincias']
			town =  Municipios.where(nombre: params['municipios'])[0][:nombre]
			norm_town = normileze_string(town)
			province = Provincias.where(id_provincia: params['provincias'])[0][:provincia]
			norm_province = normileze_string(province)
			cod_prov = normalize_string_int(params['provincias'])

			address = "#{norm_town.split(' ').join('+')},+#{norm_province.split(' ').join('+')},+Spain"
			result = JSON.parse(open("https://maps.googleapis.com/maps/api/geocode/json?address=#{address}&key=#{@@conf['geocoding_api_key']}").read)
			coordinates = result['results'][0]['geometry']['location']
			insert = "INSERT INTO frs (town, cod_prov, nom_prov, date, the_geom) 
		    	VALUES ('#{norm_town}', '#{cod_prov}', '#{norm_province}', now(), ST_SetSRID(ST_Point(#{coordinates['lng']}, #{coordinates['lat']}),4326))"
		 
		    open("https://#{@@conf['cartodb_user']}.cartodb.com/api/v2/sql?q=#{insert}&api_key=#{@@conf['cartodb_api_key']}").read
			flash[:town] = town
			flash[:province] = province
		end
		redirect_to action: 'add_fire'
	end


	def normalize_string_int(cod_prov)
		cod_provs = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']
		cod_int = cod_prov.to_i
		return cod_int < 10 ? cod_provs[cod_int] : cod_prov
	end

end
