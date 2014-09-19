class LocationsController < ApplicationController
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
      @per_page = 20
    end
    @locations = Location.all.order("id").page(@page).per_page(@per_page)
    @locations_count = @locations.count
    @locations_info = {}
    @locations_info.merge!(count: @locations_count)
    @locations_info.merge!(locations: @locations)
    render json: @locations_info.to_json
  end

  def show
    @location = Location.find(params[:id])
    render json: @location.to_json
  end

  def create
    @location = Location.new(location_params)
    if @location.save
      render json: @location
    else
      render json: {message: @location.errors.full_messages}
    end
  end

  def update
    @location = Location.find(params[:id])
    if @location.update_attributes(location_params)
      render json: @location
    else
      render json: {message: @location.errors.full_messages}
    end
  end

  def destroy
    @location = Location.find(params[:id])
    if @location.destroy
      render json: @location
    else
      render json: {message: 'Something went wrong while deleting location'}
    end
  end

  private

  def location_params
    # params.require(:location).permit(:name, :lat, :lng)
    params.permit(:name, :lat, :lng)
  end
end
