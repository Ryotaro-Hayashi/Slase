module Api
  module Post
    class QuestionsController < ApplicationController
      # before_action :authenticate_api_user!

      def create
        question = Question.new(question_params)
        # ユーザーとの紐付け
        question.user_id = current_api_user.id

        if question.save
          render json: question
        else
          render json: nil
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
        render json: user.questions
      end

      private

      def question_params
        params.require(:question).permit(:title, :body)
      end
    end
  end
end
