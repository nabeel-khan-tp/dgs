class LogsController < ApplicationController
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
    @logs = Log.all.order("id").page(@page).per_page(@per_page)
    @logs_count = @logs.count
    @logs_info = {}
    @logs_info.merge!(count: @logs_count)
    @logs_info.merge!(logs: @logs)
    render json: @logs_info.to_json
  end

  def show
    @log = Log.find(params[:id])
    render json: @log.to_json
  end

  def create
    @log = Log.new(log_params)
    if @log.save
      render json: @log
    else
      render json: {message: @log.errors.full_messages}
    end
  end

  def update
    @log = Log.find(params[:id])
    if @log.update_attributes(log_params)
      render json: @log
    else
      render json: {message: @log.errors.full_messages}
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
