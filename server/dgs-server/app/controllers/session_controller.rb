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
      role = user.role
      if role.present?
        role_info = {}
        permissions = role.permissions
        permissions_info = []
        permissions.each do |p|
          rights = RolesToPermissions.where(:role_id => role.id, :permission_id => Permission.find(p)).first.rights
          permissions_info.push(id: p.id, name: p.name, rights: rights)
        end
        role_info.merge!(id: role.id, name: role.name, permissions: permissions_info)
        user_info = {id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: role_info}
      else
        role_info ={}
        user_info = {id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: role_info}
      end     
      if user.api_keys.length > 0
        if user.api_keys.first.expired_at < Time.now
          api_key = user.api_keys.first
          api_key.expired_at = 4.days.from_now
          api_key.save!
          render json: {auth_key: api_key, status: 201, user: user_info}
        else
          render json: {auth_key: user.api_keys.first, status: 201, user: user_info}
        end
      else
        render json: {auth_key: user.session_api_key, status: 201, user: user_info}
      end
    else
      render json: {}, status: 401
    end
  end
end
