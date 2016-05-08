class BackofficeController < ApplicationController
	def index
	end

	def edit
		@auth = request.env['omniauth.auth']
		@users = User.all
		@nickname = request.env['omniauth.auth']['info']['email'].split('@').first
		@exists = @users.select {|user| user.user == @nickname } 

		if @exists.length === 0
			redirect_to action: "index"
		else 
			if @exists[0].user_type != 'S'
				redirect_to action: "index"
			end
		end

	end
end
