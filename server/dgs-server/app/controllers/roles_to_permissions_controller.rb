class RolesToPermissionsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user, except: [:options]

  def options
    render text: ''
  end

  def assign_rights
    @role = params[:role_id]
    @permissions = params[:permission_id]
    @rights = params[:rights]
    @role_permission = RolesToPermissions.create(:role_id => @role, :permission_id => @permissions, :rights => @rights)
    render json: @role_permission.to_json
  end

  def destroy_all
    RolesToPermissions.destroy_all(:role_id => params[:role_id]);
    render json: {status:"Success"}
    #@permission = RolesToPermissions.all.find_by(:role_id => params[:role_id]);
    #if @permission.destroy
    #  render json: @permission
    #else
    #  render json: {message: 'Something went wrong while deleting permissions'}
    #end
  end
end