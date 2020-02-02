Rails.application.routes.draw do
  # devise_for :users

  namespace 'api' do

    mount_devise_token_auth_for 'User', at: 'auth'

    namespace 'post' do
      resources :questions
      get '/mypost/:id', to: 'questions#mypost'
    end

  end
end
