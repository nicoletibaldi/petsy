class Api::FavoritesController < ApplicationController
  def index
    @favorites = Favorite.where(user_id: current_user.id)
    render :index
  end

  def create
    favorite = current_user.favorites.create!(favorite_params)
    render json: favorite
  end

  def destroy
    pet_id = params[:id]
    favorite = current_user.favorites.find_by(pet_id: pet_id)
    favorite.destroy!
    render json: favorite
  end


  private
  def favorite_params
    params.require(:favorite).permit(:user_id, :pet_id)
  end
end
