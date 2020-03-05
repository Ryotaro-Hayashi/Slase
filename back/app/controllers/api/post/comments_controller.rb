class Api::Post::CommentsController < ApplicationController

  def create
    comment = Comment.new
    comment.user_id = params[:user_id]
    comment.question_id = params[:question_id]
    comment.content = params[:content]
  end
end
