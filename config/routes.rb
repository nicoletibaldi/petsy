Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :pets, only: [:create, :edit, :show, :index, :destroy]
    get "search_pets", to: "pets#search"
    resources :favorites, only: [:create, :destroy, :show, :index]
  end

  root "static_pages#root"
end
