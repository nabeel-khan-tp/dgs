class SessionController < ApplicationController
  skip_before_filter :verify_authenticity_token
  
  def index
  	render nothing: true
  end

  def create
    user = User.where("email = ? AND password = ?", params[:email], params[:password]).first
    if user
      render json: {authentication_key: user.session_api_key.access_token, status: 201, user: user}
    else
      render json: {}, status: 401
    end
  end
end
