Rails.application.routes.draw do
  namespace :api do
    get 'users/index'
    get 'users/show'
  end
  # devise_for :users

  namespace 'api' do

    # ユーザー認証のためのエンドポイント
    mount_devise_token_auth_for 'User', at: 'auth'

    namespace 'post' do
      # question作成のためのエンドポイント
      resources :questions
      # ユーザーのidによって、そのidのユーザーのquestionを返すエンドポイント
      get '/mypost/:id', to: 'questions#mypost'

      # コメントのエンドポイント
      resources :comments

    end

    resources :relationships

    # そのidのユーザーのフォローしているユーザーを返すエンドポイント
    get '/followings/:user_id', to: 'relationships#followings'
    get '/followers/:user_id', to: 'relationships#followers'

    # そのidのユーザーのフォローしているユーザーの数を返すエンドポイント 
    get '/followings/num/:user_id', to: 'relationships#num_followings'
    get '/followers/num/:user_id', to: 'relationships#num_followers'

  end
end
