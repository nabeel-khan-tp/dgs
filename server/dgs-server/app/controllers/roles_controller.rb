class RolesController < ApplicationController
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
      @per_page = 5
    end
    @roles = Role.all.order("id").page(@page).per_page(@per_page)
    @roles_count = @roles.count
    @roles_info = {}
    @roles_info.merge!(count: @roles_count)
    @roles_info.merge!(roles: @roles)
    render json: @roles_info.to_json
  end

  def show
    @role = Role.find(params[:id])
    render json: @role.to_json
  end

  def create
    @role = Role.new(role_params)
    if @role.save
      render json: @role
    else
      render json: {message: @role.errors.full_messages}
    end
  end

  def update
    @role = Role.find(params[:id])
    if @role.update_attributes(role_params)
      render json: @role
    else
      render json: {message: @role.errors.full_messages}
    end
  end

  def destroy
    @role = Role.find(params[:id])
    if @role.destroy
      render json: @role
    else
      render json: {message: 'Something went wrong while deleting role'}
    end
  end

  private

  def role_params
    # params.require(:role).permit(:name)
    params.permit(:name)
  end
end
