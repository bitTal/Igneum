class CreateFires < ActiveRecord::Migration
  def change
    create_table :fires do |t|
      t.decimal :lat
      t.decimal :lng
      t.string :city
      t.string :ca
      t.date :date_ini
      t.time :time_ini
      t.integer :area
      t.string :teams

      t.timestamps null: false
    end
  end
end
