class SessionController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def create
    user = User.where("email = ?", params[:email]).first
    if user #&& user.authenticate(params[:password])
      render json: user.session_api_key, status: 201
    else
      render json: {}, status: 401
    end
  end
end
