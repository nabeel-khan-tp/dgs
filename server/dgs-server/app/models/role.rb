class Role < ActiveRecord::Base
  has_many :users
  has_many :roles_to_permissions, class_name: RolesToPermissions
  has_many :permissions, through: :roles_to_permissions
end
