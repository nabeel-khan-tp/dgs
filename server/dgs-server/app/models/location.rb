class Location < ActiveRecord::Base
  has_many :devices
  validates_presence_of :name, :lat, :lng
end
