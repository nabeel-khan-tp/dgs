class User < ActiveRecord::Base
  belongs_to :role
  has_many :devices
  has_many :backup_schedules
  has_many :api_keys

  validates_presence_of :first_name, :last_name, :email, :password
  validates_uniqueness_of :email
  
  def session_api_key
    api_keys.active.session.first_or_create
  end
end
