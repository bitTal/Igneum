class BackofficeController < ApplicationController
	def index
      @fires = Fire.all
	end
end
