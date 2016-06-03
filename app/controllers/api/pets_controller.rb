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
    else
      @pets = Pet.all
    end
    render :index

    #<Pet:0x007febbff5ad18 id: nil, animal: "Cat">,
 #<Pet:0x007febbff5a7c8 id: nil, animal: "Rabbit">,
 #<Pet:0x007febbff5a368 id: nil, animal: "Scales, Fins & Other">,
 #<Pet:0x007febbff5a0e8 id: nil, animal: "Dog">,
 #<Pet:0x007febbff59e68 id: nil, animal: "Small & Furry">]
  end


  private

  def pet_params
    params.require(:pet).permit(:name, :animal, :age, :breed, :contact_email, :description, :sex, :image)
  end
end
