class LocationsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user, except: [:options]

  def options
    render text: ''
  end
  
  def index
    @locations = Location.all.order("id").page(params[:page]).per_page(5)
    render json: @locations.to_json
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
