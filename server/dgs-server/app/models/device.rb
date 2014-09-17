class Device < ActiveRecord::Base
  belongs_to :user
  belongs_to :location
  has_many :logs
  has_many :backup_schedules
  validates_presence_of :device_name, :space_available, :total_space_allocated, :status
end
