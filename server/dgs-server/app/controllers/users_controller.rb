class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user , except: [:options,:create]
  #after_filter :allow_cors

  def options
    render text: ''
  end
  
   # in home_controller.rb
  def index
    @page = params[:page]
    if params[:per_page].present?  
      @per_page = params[:per_page].to_i
    else
      @per_page = 5
    end
    @users = User.all.order("id").page(@page).per_page(@per_page)
    @users_count = @users.count
    @users_info = {}
    @users_info.merge!(count: @users_count)
    @users_info.merge!(users: @users)
    render json: @users_info.to_json
  end

  def show
    @user = User.find(params[:id])
    @role = @user.role
    if @role.present?
      @role_info ={}
      @permissions = @role.permissions
      @permissions_info = []
      @permissions.each do |p|
        @permissions_info.push(id: p.id, name: p.name)
      end
      @role_info.merge!(id: @role.id, name: @role.name, permissions: @permissions_info)
      @user_info = {id: @user.id, first_name: @user.first_name, last_name: @user.last_name, email: @user.email, role: @role_info}
    else
      @role_info ={}
      @user_info = {id: @user.id, first_name: @user.first_name, last_name: @user.last_name, email: @user.email, role: @role_info}
    end
     render json: @user_info.to_json
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
    if @user.update(user_params)
      render json: @user
    else
      render json: {message: @user.errors.full_messages,params: params.inspect}
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
    params.permit(:id,:role_id, :first_name, :last_name, :email, :password)
  end
end
