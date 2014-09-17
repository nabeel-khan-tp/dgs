class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user , except: [:options,:create]
  
  def options
    render text: ''
  end
   # in home_controller.rb
  def index
    @users = User.all.order("id").page(params[:page]).per_page(5)
    render json: @users.to_json
  end

  def show
    @user = User.find(params[:id])
    render json: @user.to_json
  end

  def create
    @user = User.new(user_params)
    if @user.save
      auth_key = @user.session_api_key
      render json: {user: @user, auth_key: auth_key}
    else
      render json: {message: @user.errors.full_messages}
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render json: @user
    else
      render json: {message: @user.errors.full_messages}
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
