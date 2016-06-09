class Api::PetsController < ApplicationController
  def create
    @pet = Pet.new(pet_params)

    if @pet.save
      render :show
    else
      render json: @pet.errors, status: 422
    end
  end

  def show
    @pet = Pet.find(params[:id])

    render :show
  end

  def index
    if params[:animal] == "dogs"
      @pets = Pet.where({animal: "Dog"})
    elsif params[:animal] == "cats"
      @pets = Pet.where({animal: "Cat"})
    elsif params[:animal] == "rabbits"
      @pets = Pet.where({animal: "Rabbit"})
    elsif params[:animal] == "reptiles"
      @pets = Pet.where({animal: "Scales, Fins & Other"})
    elsif params[:animal] == "other"
      @pets = Pet.where({animal: "Small & Furry"})
    else
      @pets = Pet.all
    end
    render :index
  end

  def search
    @pets = Pet.search_by_all_columns(params[:query])
    render :search
  end

  def update
    @pet = Pet.where(user_id: current_user.id).find(params[:id])
    if @pet.update(pet_params)
      render :show
    else
      render json: @pet.errors, status: 422
    end
  end

  def destroy
    @pet = Pet.where(user_id: current_user.id).find(params[:id])
    @pet.destroy
    render :index
  end
                 
  private

  def pet_params
    params.require(:pet).permit(:name, :animal, :age, :breed,
      :contact_email, :description, :sex, :image, :user_id)
  end
end
