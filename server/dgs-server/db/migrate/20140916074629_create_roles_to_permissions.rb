class CreateRolesToPermissions < ActiveRecord::Migration
  def change
    create_table :roles_to_permissions do |t|
      t.integer :role_id
      t.integer :permission_id
      t.timestamps
    end
  end
end
