class LogsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user
  
  def index
    @logs = Log.all
    render json: @logs
  end

  def show
    @log = Log.find(params[:id])
    render json: @log
  end

  def create
    @log = Log.new(log_params)
    if @log.save
      render json: @log
    else
      render json: {message: 'Something went wrong while creating log'}
    end
  end

  def update
    @log = Log.find(params[:id])
    if @log.update_attributes(log_params)
      render json: @log
    else
      render json: {message: 'Something went wrong while updating log'}
    end
  end

  def destroy
    @log = Log.find(params[:id])
    if @log.destroy
      render json: @log
    else
      render json: {message: 'Something went wrong while deleting log'}
    end
  end

  private

  def log_params
    # params.require(:log).permit(:device_id, :message)
    params.permit(:device_id, :message)
  end
end
