Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :things do
        member do
          delete :delete_image_attachment
        end
      end
      resources :labels
    end
  end
  get "/api/v1/create/thing", to: "api/v1/things#new"
  get "/api/v1/archived/things", to: "api/v1/things#archived"
  put "/api/v1/things/:id/labels", to: "api/v1/things#labelToThing"
  put "/api/v1/things/:id/archive", to: "api/v1/things#archive"

end
