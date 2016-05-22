class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string   :user
      t.string   :name
      t.string   :city
      t.string   :country
      t.string   :profession
      t.date    :birthday
      t.string   :type

      t.timestamps null: false
    end
  end
end
