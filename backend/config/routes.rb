Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post '/login', to: 'sessions#create'

      resources :todos, only: [:index, :create, :update, :destroy]
  
    end
  end 
end
