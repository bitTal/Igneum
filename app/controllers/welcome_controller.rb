class WelcomeController < ApplicationController
	require 'open-uri'
	require('yaml')
	@@conf = YAML.load_file("#{Dir.pwd}/config/confidencial.yml")

	def index
	end

	def month
		@auxMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
			'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
		@months = @auxMonths.map.with_index(1).to_a
		@years = ['2016', '2015'];
		@month = params['month1'] || Date.today.month
		@year = params['year1'] || Date.today.year

		@fires = get_fires()
		@diff_provs = diff_provs()[0]['diff_provs']
		@max_fires_prov = max_fires_prov()[0]['max']
		@max_provs = max_provs(@max_fires_prov)
	end
	
	def compare
		@auxMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
			'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
		@months = @auxMonths.map.with_index(1).to_a
		@years = ['2016', '2015'];
		@month1 = params['month1'] || Date.today.month
		@year1 = params['year1'] || Date.today.year
		@month2 = params['month2'] || Date.today.month
		@year2 = params['year2'] || Date.today.year
	end


	## Support fucntions

	def get_fires
		current_date = Time.now
		where = "WHERE EXTRACT(month FROM date)='#{current_date.month}' AND EXTRACT(year FROM date)='#{current_date.year}'"
		sql = "SELECT * FROM #{@@conf['cartodb_table1']} #{where}"
        uri = "https://#{@@conf['cartodb_user']}.cartodb.com/api/v2/sql?q=#{sql}"
        return JSON.parse(open(uri).read)['rows']
	end

	def diff_provs
		sql = "SELECT count(distinct cod_prov) as diff_provs FROM #{@@conf['cartodb_table1']}"
        uri = "https://#{@@conf['cartodb_user']}.cartodb.com/api/v2/sql?q=#{sql}"
        return JSON.parse(open(uri).read)['rows']
	end

	def max_provs(max_fires_prov)
		group = "GROUP BY nom_prov"		
		having = "HAVING count(nom_prov) = #{max_fires_prov}"
		sql = "SELECT nom_prov FROM frs #{group} #{having}"
        uri = "https://#{@@conf['cartodb_user']}.cartodb.com/api/v2/sql?q=#{sql}"
        return JSON.parse(open(uri).read)['rows']
	end

	def max_fires_prov
		group = "GROUP BY nom_prov"
		sql1 = "SELECT nom_prov, count(nom_prov) as diff_provs FROM #{@@conf['cartodb_table1']} #{group}"
		sql = "WITH t AS (#{sql1}) select max(diff_provs) from t"
        uri = "https://#{@@conf['cartodb_user']}.cartodb.com/api/v2/sql?q=#{sql}"
        return JSON.parse(open(uri).read)['rows']
	end

end

