Rails.application.routes.draw do

  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  resources :users do
    resource :posts, only: [:show] 
    #   get 'posts', to: :show
    # end
  end
  
  resource :posts, :tags
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html



end
