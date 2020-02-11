module Api
  module Post
    class QuestionsController < ApplicationController
      # before_action :authenticate_api_user!

      def create
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

      def mypost
        # ユーザーのidでユーザーを取り出し
        user = User.find(params[:id])
        # 取り出したユーザーが作成したquestionを返す
        render json: user.questions.order(created_at: :desc)
      end

    end
  end
end
