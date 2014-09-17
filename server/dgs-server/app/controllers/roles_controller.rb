class RolesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user, except: [:options]

  def options
    render text: ''
  end
  
  def index
    @roles = Role.all
    render json: @roles.to_json
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
