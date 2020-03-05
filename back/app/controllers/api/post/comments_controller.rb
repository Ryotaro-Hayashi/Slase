class Api::Post::CommentsController < ApplicationController

  def create
    comment = Comment.new
    # comment.user_id = params[:user_id]
    # comment.question_id = params[:question_id]
    comment.content = params[:content]

    # question = Question.find_by(id: params[:question_id])
    # if question.save
    #   render json: question
    # end
    if comment.save
      render json: comment
    end
  end

end
