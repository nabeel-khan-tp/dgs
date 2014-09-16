class Device < ActiveRecord::Base
  belongs_to :user
  belongs_to :location
  has_many :logs
  has_many :backup_schedules
end
