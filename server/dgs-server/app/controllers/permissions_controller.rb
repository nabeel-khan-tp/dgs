class PermissionsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user, except: [:options]

  def options
    render text: ''
  end
  
  def index
    @page = params[:page]
    if params[:per_page].present?  
      @per_page = params[:per_page].to_i
    else
      @per_page = 20
    end
    @permissions = Permission.all.order("id").page(@page).per_page(@per_page)
    @permissions_count = @permissions.count
    @permissions_info = {}
    @permissions_info.merge!(count: @permissions_count)
    @permissions_info.merge!(permissions: @permissions)
    render json: @permissions_info.to_json
  end

  def show
    @permission = Permission.find(params[:id])
    render json: @permission.to_json
  end

  def create
    @permission = Permission.new(permission_params)
    if @permission.save
      render json: @permission
    else
      render json: {message: @permission.errors.full_messages}
    end
  end

  def update
    @permission = Permission.find(params[:id])
    if @permission.update_attributes(permission_params)
      render json: @permission
    else
      render json: {message: @permission.errors.full_messages}
    end
  end

  def destroy
    @permission = Permission.find(params[:id])
    if @permission.destroy
      render json: @permission
    else
      render json: {message: 'Something went wrong while deleting permission'}
    end
  end

  private

  def permission_params
    # params.require(:permission).permit(:name)
    params.permit(:name)
  end
end
