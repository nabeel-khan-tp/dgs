class PermissionsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user
  
  def index
    @permissions = Permission.all
    render json: @permissions
  end

  def show
    @permission = Permission.find(params[:id])
    render json: @permission
  end

  def create
    @permission = Permission.new(permission_params)
    if @permission.save
      render json: @permission
    else
      render json: {message: 'Something went wrong while creating permission'}
    end
  end

  def update
    @permission = Permission.find(params[:id])
    if @permission.update_attributes(permission_params)
      render json: @permission
    else
      render json: {message: 'Something went wrong while updating permission'}
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
