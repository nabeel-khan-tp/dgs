class SessionController < ApplicationController
  skip_before_filter :verify_authenticity_token
  
  def options
    render text: ''
  end
  
  def index
  	render nothing: true
  end

  def create
    user = User.where("email = ? AND password = ?", params[:email], params[:password]).first
    if user
      if user.api_keys.length > 0
        if user.api_keys.first.expired_at < Time.now
          api_key = user.api_keys.first
          api_key.expired_at = 4.days.from_now
          api_key.save!
          render json: {authentication_key: api_key.access_token, status: 201, user: user}
        end
      else
        render json: {authentication_key: user.session_api_key.access_token, status: 201, user: user}
      end
    else
      render json: {}, status: 401
    end
  end
end
