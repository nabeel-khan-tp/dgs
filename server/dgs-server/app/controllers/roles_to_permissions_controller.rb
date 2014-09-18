class RolesToPermissionsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user, except: [:options]

  def assign_rights
    @role = params[:role_id]
    @permissions = params[:permission_id]
    @rights = params[:right]
    @role_permission = RolesToPermissions.create(:role_id => @role, :permission_id => @permissions, :rights => @rights)
    render json: @role_permission.to_json
  end
end
