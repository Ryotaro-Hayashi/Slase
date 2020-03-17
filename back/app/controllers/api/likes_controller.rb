class Api::LikesController < ApplicationController

  def create
    like = Like.new
    like.user_id = current_api_user.id
    like.question_id = params[:question_id]

    if like.save
      render json: like
    end
  end

  def destroy
    like = Like.find_by(params[:question_id], params[:user_id])
    if like.destroy
      render json: like
    end
  end

  def index
    likes = Like.all
    render json: likes
  end

end
