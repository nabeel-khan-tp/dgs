class BackupSchedulesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_authenticated_user
  
  def index
    @backup_schedules = BackupSchedule.all
    render json: @backup_schedules.to_json
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
