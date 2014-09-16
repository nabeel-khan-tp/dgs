class RolesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    @roles = Role.all
    render json: @roles
  end

  def show
    @role = Role.find(params[:id])
    render json: @role
  end

  def create
    @role = Role.new(role_params)
    if @role.save
      render json: @role
    else
      render json: {message: 'Something went wrong while creating role'}
    end
  end

  def update
    @role = Role.find(params[:id])
    if @role.update_attributes(role_params)
      render json: @role
    else
      render json: {message: 'Something went wrong while updating role'}
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
    params.require(:role).permit(:name)
  end
end