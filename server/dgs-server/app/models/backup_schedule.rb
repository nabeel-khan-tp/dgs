class BackupSchedule < ActiveRecord::Base
  belongs_to :user
  belongs_to :device
end
