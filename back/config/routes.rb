Rails.application.routes.draw do
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

    get '/relevance/:user_id', to: 'relationships#relevance'

  end
end
