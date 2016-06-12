Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :pets, only: [:create, :update, :show, :index, :destroy]
    get "search_pets", to: "pets#search"
    resources :favorites, only: [:create, :destroy, :show, :index]
  end
  get "/auth/:provider/callback", to: "api/sessions#auth_create"

  root "static_pages#root"
end
