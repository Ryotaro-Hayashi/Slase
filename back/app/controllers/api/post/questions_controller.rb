module Api
  module Post
    class QuestionsController < ApplicationController
      # before_action :authenticate_api_user!

      def create
        question = Question.new(question_params)
        question.user_id = current_api_user.id
        if question.save
          render json: question
        else
          render json: nil
        end
      end

      def index
        questions = Question.all
        render json: questions
      end

      private

      def question_params
        params.require(:question).permit(:title, :body)
      end
    end
  end
end
