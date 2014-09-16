class CreateDevices < ActiveRecord::Migration
  def change
    create_table :devices do |t|
      t.integer :user_id
      t.integer :location_id
      t.string :device_name
      t.decimal :space_available, :precision => 10, :scale => 2
      t.decimal :total_space_allocated, :precision => 10, :scale => 2
      t.integer :status
      t.datetime :uptime

      t.timestamps
    end
  end
end
