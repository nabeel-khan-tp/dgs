class AddRightsToRolesToPermissions < ActiveRecord::Migration
  def change
    add_column :roles_to_permissions, :rights, :integer, :default => 0
  end
end
