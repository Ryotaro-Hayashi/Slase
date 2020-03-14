module Api
  module Post
    class QuestionsController < ApplicationController
      # before_action :authenticate_api_user!

      def create
        # Question.createでストロングパラメーターを使用すると上手くいかない
        question = Question.new

        question.title = params[:title]
        question.body = params[:body]
        question.image = params[:image]

        # ユーザーとの紐付け
        question.user_id = current_api_user.id

        if question.save
          # save後にcreated_atが使用可能になるのでここで作成日時を定義
          question.date = question.created_at.to_s(:date)
          question.time = question.created_at.to_s(:time)

          # データベースに保存
          question.save
          render json: question
        end

      end

      def index
        # 作成時間順でquestion全部を取り出し
        questions = Question.all.order(created_at: :desc)
        render json: questions
      end

      def show
        # questionのidで取り出し
        question = Question.find(params[:id])
        render json: question
      end

      # フォローしているユーザーの投稿を返す
      def followings_post
        user = User.find(params[:user_id])
        # userのフォローしているユーザー
        followings = user.followings
        # フォローしているユーザーのidを格納する配列
        followings_id = []

        # フォローしているユーザー1人1人を取り出す
        followings.each do |following|
          # フォローしているユーザーのidを格納
          followings_id.push(following.id)
        end

        followings_id.push(user.id)

        # フォローしているユーザーのidをuser_idに持つquestionを取り出す
        question = Question.all.where(user_id: followings_id).order(created_at: :desc)

        render json: question
      end

    end
  end
end
