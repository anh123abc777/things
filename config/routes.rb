Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :things
      resources :labels
    end
  end
  get "/api/v1/create/thing", to: "api/v1/things#new"
  get "/api/v1/archived/things", to: "api/v1/things#archived"
  put "/api/v1/things/:id/labels", to: "api/v1/things#labelToThing"
  put "/api/v1/things/:id/archive", to: "api/v1/things#archive"
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
