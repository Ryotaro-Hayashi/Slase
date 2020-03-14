class Api::LikesController < ApplicationController

  def create
    like = Like.new
    like.user_id = current_api_user.id
    like.question_id = params[:question_id]

    if like.save
      render json: like
    end
  end

  def delete
    like = Like.find_by(question_id: params[:question_id], user_id: current_api_user.id)
    like.destroy
  end

  def index
    likes = Like.all
    render json: likes
  end

end
