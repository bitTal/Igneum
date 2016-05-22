class WelcomeController < ApplicationController
	def index
	end

	def month
		auxMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
			'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
		@months = auxMonths.map.with_index(1).to_a
		@years = ['2016', '2015'];
		@month = params['month1'] || Date.today.month
		@year = params['year1'] || Date.today.year

	end
	
	def compare
		auxMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
			'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
		@months = auxMonths.map.with_index(1).to_a
		@years = ['2016', '2015'];
		@month1 = params['month1'] || Date.today.month
		@year1 = params['year1'] || Date.today.year
		@month2 = params['month2'] || Date.today.month
		@year2 = params['year2'] || Date.today.year
	end

end
