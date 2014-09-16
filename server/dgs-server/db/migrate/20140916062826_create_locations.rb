class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.decimal :lat, :precision => 6, :scale => 2
      t.decimal :lng, :precision => 6, :scale => 2

      t.timestamps
    end
  end
end
