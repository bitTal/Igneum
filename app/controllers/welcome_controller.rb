class WelcomeController < ApplicationController
  	def index
	  @aux = Aux.all
	 
	  respond_to do |format|
	    format.html  # index.html.erb
	    format.json  { render :json => @aux }
	  end
	end
end
