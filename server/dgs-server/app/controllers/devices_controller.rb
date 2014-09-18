class DevicesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user, except: [:options]

  def options
    render text: ''
  end
  
  def index
    @page = params[:page]
    if params[:per_page].present?  
      @per_page = params[:per_page].to_i
    else
      @per_page = 5
    end
    @devices = Device.all.order("id").page(@page).per_page(@per_page)
    @devices_count = @devices.count
    @devices_info = {}
    @devices_info.merge!(count: @devices_count)
    @devices_info.merge!(devices: @devices)
    render json: @devices_info.to_json(:include => :location)
  end

  def show
    @device = Device.find(params[:id])
    render json: @device.to_json
  end

  def create
    @device = Device.new(device_params)
    if @device.save
      render json: @device
    else
      render json: {message: @device.errors.full_messages}
    end
  end

  def update
    @device = Device.find(params[:id])
    if @device.update_attributes(device_params)
      render json: @device
    else
      render json: {message: @device.errors.full_messages}
    end
  end

  def destroy
    @device = Device.find(params[:id])
    if @device.destroy
      render json: @device
    else
      render json: {message: 'Something went wrong while deleting device'}
    end
  end

  private

  def device_params
    # params.require(:device).permit(:user_id, :location_id, :device_name, :space_available, :total_space_allocated, :status, :uptime)
    params.permit(:user_id, :location_id, :device_name, :space_available, :total_space_allocated, :status, :uptime)

  end
end
