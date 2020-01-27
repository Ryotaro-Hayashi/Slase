class Api::Post::QuestionsController < ApplicationController
  def create
    question = Question.new(question_params)
    question.user_id = current_user.id
    if question.save
      render json: question
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
