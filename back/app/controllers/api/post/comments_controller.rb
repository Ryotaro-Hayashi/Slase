class Api::Post::CommentsController < ApplicationController

  def create
    comment = Comment.new
    # コメント投稿者のユーザーid
    comment.user_id = params[:user_id]
    # 紐付けする投稿のid
    comment.question_id = params[:question_id]
    comment.content = params[:content]

    if comment.save
      comment.date = comment.created_at.to_s(:date)
      comment.time = comment.created_at.to_s(:time)

      comment.save
      render json: comment
    end
  end

  def index
    comments = Comment.all
    render json: comments
  end

end
