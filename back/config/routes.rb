Rails.application.routes.draw do
  # devise_for :users

  namespace 'api' do

    mount_devise_token_auth_for 'User', at: 'auth'

    namespace 'post' do
      resources :questions
    end

  end
end
