Rails.application.routes.draw do

  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  resources :users do
    get :posts, to: 'posts#show_owner'
  end
  
  resources :posts, :tags
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html



end

# , to: :show_owner