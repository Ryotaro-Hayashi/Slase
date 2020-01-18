module Api
  module V1
    class UsersController < ApplicationController
      # ユーザーの作成と保存
      def create
        user = User.new(user_params)
        if user.save
          render json: user
        else
          render json: user.errors
        end
      end

      # ユーザーの一覧表示
      def index
        users = User.all
        render json: users
      end

      # 外部から使えないように制限
      private
      # Strong Parametersを使い、必須のパラメータと許可されたパラメータを指定
      def user_params
        # userモデルを必須にして、name,email,passwordカラムを許可
        params.require(:user).permit(:name, :email, :password)
      end
    end
  end
end
