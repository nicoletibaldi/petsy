class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors, status: 422
    end
  end

  def show
    if logged_in?
      @user = current_user
      render :show
    else
      render json: { message: "Not logged in" }, status: 401
    end
  end

def update
  @user = current_user
  @user.update!(user_params)
  render :show
end

  private

  def user_params
    params.require(:user).permit(:username, :password,
      :email, :fname, :lname, :city, :state, :description,
      :facebook_uid, :google_uid)
  end
end
