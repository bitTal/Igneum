class WelcomeController < ApplicationController
	def index
      @fires = Fire.all
	end
	

end
