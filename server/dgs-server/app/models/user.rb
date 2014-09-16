class User < ActiveRecord::Base
  belongs_to :role
  has_many :devices
  has_many :backup_schedules
end
