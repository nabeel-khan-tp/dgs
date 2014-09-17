class Log < ActiveRecord::Base
  belongs_to :device
  validates_presence_of :device_id, :message
end
