module Api
  module Post
    class QuestionsController < ApplicationController
      def create
        question = Question.new(question_params)
        question.user_id = 1
        que = user_signed_in?
        if question.save
          render json: que
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
