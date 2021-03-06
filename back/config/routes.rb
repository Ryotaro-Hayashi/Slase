Rails.application.routes.draw do
  # devise_for :users

  namespace 'api' do
    # ユーザー認証のためのエンドポイント（controllersがないとプロフィール変更ができない）
    mount_devise_token_auth_for 'User', at: 'auth', controllers: { registrations: 'api/auth/registrations' }

    # ユーザーを取得するためのエンドポイント
    resources :users, :only => [:index, :show]

    namespace 'post' do
      # question作成のためのエンドポイント
      resources :questions

      # そのidのユーザーがフォローしているユーザーのquestionを返すエンドポイント
      get '/followings/:user_id', to: 'questions#followings_post'

      # コメントのエンドポイント
      resources :comments

      resources :likes, only: [:create, :destroy, :index]

      # そのidのユーザーがいいねしているquestionを返すエンドポイント
      get '/liked/:user_id', to: 'questions#liked_post'
    end

    resources :relationships, :only => [:create, :destroy]

    # そのidのユーザーのフォローしているユーザーを返すエンドポイント
    get '/followings/:user_id', to: 'relationships#followings'
    get '/followers/:user_id', to: 'relationships#followers'

  end
end
