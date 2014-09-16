class LocationsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user, only: [:index]

  def index
    @locations = Location.all
    render json: @locations
  end

  def show
    @location = Location.find(params[:id])
    render json: @location
  end

  def create
    @location = Location.new(location_params)
    if @location.save
      render json: @location
    else
      render json: {message: 'Something went wrong while creating location'}
    end
  end

  def update
    @location = Location.find(params[:id])
    if @location.update_attributes(location_params)
      render json: @location
    else
      render json: {message: 'Something went wrong while updating location'}
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
    params.require(:location).permit(:name, :lat, :lng)
  end
end
