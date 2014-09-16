class User < ActiveRecord::Base
  belongs_to :role
  has_many :devices
  has_many :backup_schedules
  has_many :api_keys

  def session_api_key
    api_keys.active.session.first_or_create
  end
end
