class Api::V1::StafflogController < ApplicationController
  def index
    stafflog = Stafflog.all.order(date: :desc)
    render json: stafflog
  end

  def create
    stafflog = Stafflog.create!(log_params)
    if stafflog
      render json: stafflog
    else
      render json: stafflog.errors
    end
  end

  def update
    if stafflog
      @entry = Stafflog.find(params[:id])
      @entry.update(log_params)
    else
      render json: stafflog.errors
    end
  end

  def destroy
    stafflog&.destroy
    render json: { message: 'Log entry deleted!' }
  end

  private

  def log_params
    params.permit(:date, :subject, :message)
  end

  def stafflog
    @stafflog ||= Stafflog.find(params[:id])
  end
end
