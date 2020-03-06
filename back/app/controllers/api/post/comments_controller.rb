class Api::Post::CommentsController < ApplicationController

  def create
    comment = Comment.new
    # コメント投稿者のユーザーid
    comment.user_id = params[:user_id]
    # 紐付けする投稿のid
    comment.question_id = params[:question_id]
    comment.content = params[:content]

    # question = Question.find_by(id: params[:question_id])
    # if question.save
    #   render json: question
    # end
    if comment.save
      render json: comment
    end
  end

  def index
    # comments = Comment.find_by(question_id: params[:question_id])
    comments = Comment.all
    render json: comments
  end

end
