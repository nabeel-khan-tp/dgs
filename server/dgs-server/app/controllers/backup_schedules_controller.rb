class BackupSchedulesController < ApplicationController
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
    @backup_schedules = BackupSchedule.all.order("id").page(@page).per_page(@per_page)
    @backup_schedules_count = @backup_schedules.count
    @backup_schedules_info = {}
    @backup_schedules_info.merge!(count: @backup_schedules_count)
    @backup_schedules_info.merge!(backup_schedules: @backup_schedules)
    render json: @backup_schedules_info.to_json
  end

  def show
    @backup_schedule = BackupSchedule.find(params[:id])
    render json: @backup_schedule.to_json
  end

  def create
    @backup_schedule = BackupSchedule.new(backup_schedule_params)
    if @backup_schedule.save
      render json: @backup_schedule
    else
      render json: {message: @backup_schedule.errors.full_messages}
    end
  end

  def update
    @backup_schedule = BackupSchedule.find(params[:id])
    if @backup_schedule.update_attributes(backup_schedule_params)
      render json: @backup_schedule
    else
      render json: {message: @backup_schedule.errors.full_messages}
    end
  end

  def destroy
    @backup_schedule = BackupSchedule.find(params[:id])
    if @backup_schedule.destroy
      render json: @backup_schedule
    else
      render json: {message: 'Something went wrong while deleting backup schedule'}
    end
  end

  private

  def backup_schedule_params
    # params.require(:backup_schedule).permit(:user_id, :device_id, :backup_type, :status, :title)
    params.permit(:user_id, :device_id, :backup_type, :status, :title)
  end
end
