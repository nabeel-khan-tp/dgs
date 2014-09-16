class CreateBackupSchedules < ActiveRecord::Migration
  def change
    create_table :backup_schedules do |t|
      t.integer :user_id
      t.integer :device_id
      t.integer :backup_type
      t.integer :status
      t.string :title

      t.timestamps
    end
  end
end
