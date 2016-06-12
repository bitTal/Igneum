# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160508192037) do

  create_table "aux", id: false, force: :cascade do |t|
    t.integer "id",   limit: 4
    t.string  "name", limit: 5
  end

  create_table "fires", force: :cascade do |t|
    t.decimal  "lat",                    precision: 10
    t.decimal  "lng",                    precision: 10
    t.string   "city",       limit: 255
    t.string   "ca",         limit: 255
    t.date     "date_ini"
    t.time     "time_ini"
    t.integer  "area",       limit: 4
    t.string   "teams",      limit: 255
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "user",       limit: 255
    t.string   "name",       limit: 255
    t.string   "city",       limit: 255
    t.string   "country",    limit: 255
    t.string   "profession", limit: 255
    t.date     "birthday"
    t.string   "type",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

end
