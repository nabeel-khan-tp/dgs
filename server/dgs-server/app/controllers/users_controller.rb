class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token
  
   # in home_controller.rb
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.session_api_key
      render json: @user
    else
      render json: {message: 'Something went wrong while creating user'}
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render json: @user
    else
      render json: {message: 'Something went wrong while updating user'}
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render json: @user
    else
      render json: {message: 'Something went wrong while deleting user'}
    end
  end

  private

  def user_params
    # params.require(:user).permit(:role_id, :first_name, :last_name, :email, :password)
    params.permit(:role_id, :first_name, :last_name, :email, :password)
  end
end
