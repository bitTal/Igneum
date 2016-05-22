class WelcomeController < ApplicationController
	def index
	end

	def month
		auxMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
			'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
		@months = auxMonths.map.with_index(1).to_a
		@years = ['2016', '2015'];
	end
	
	def compare
		auxMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
			'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
		@months = auxMonths.map.with_index(1).to_a
		@years = ['2016', '2015'];
	end

end
