class BackupSchedule < ActiveRecord::Base
  belongs_to :user
  belongs_to :device
  validates_presence_of :device_id, :backup_type, :status, :title
end
