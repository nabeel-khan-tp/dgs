class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
	protect_from_forgery with: :null_session

	before_filter :allow_cors

	def allow_cors
	  headers["Access-Control-Allow-Origin"] = "*"
	  headers["Access-Control-Allow-Methods"] = %w{GET POST PUT DELETE OPTIONS}.join(",")
	  headers["Access-Control-Allow-Headers"] =
	    %w{Origin Accept Authorization Content-Type X-Requested-With X-CSRF-Token}.join(",")

	  #head(:ok) if request.request_method == "OPTIONS"
	  # or, render text: ''
	  # if that's more your style
	end

  def ensure_authenticated_user
    head :unauthorized unless current_user
  end

  # Returns the active user associated with the access token if available
  def current_user
    api_key = ApiKey.active.where(access_token: token).first
    if api_key
      return api_key.user
    else
      return nil
    end
  end

  # Parses the access token from the header
  def token
    bearer = request.headers["HTTP_AUTHORIZATION"]
    if bearer.present?
      bearer.split.last
    else
      nil
    end
  end

end
