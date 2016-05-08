class BackofficeController < ApplicationController
	def index
	end

	def edit
		@auth = request.env['omniauth.auth']
		@users = User.all
	end
end
