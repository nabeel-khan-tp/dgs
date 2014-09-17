class Permission < ActiveRecord::Base
  has_many :roles_to_permissions, class_name: RolesToPermissions
  has_many :roles, through: :roles_to_permissions
  validates_presence_of :name
end
