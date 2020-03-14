class Api::LikesController < ApplicationController

  def create
    like = current_api_user.like.create(question_id: params[:question_id])
  end

  def delete
    like = Like.find_by(question_id: params[:question_id], user_id: current_api_user.id)
    like.destroy
  end

end
