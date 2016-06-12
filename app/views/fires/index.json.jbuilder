json.array!(@fires) do |fire|
  json.extract! fire, :id, :lat, :lng, :city, :ca, :date_ini, :time_ini, :area, :teams
  json.url fire_url(fire, format: :json)
end
