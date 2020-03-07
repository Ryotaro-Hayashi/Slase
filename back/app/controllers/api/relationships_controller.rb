class Api::RelationshipsController < ApplicationController
  def create
    user = User.find(params[:relationship][:follow_id])
    
    following = current_api_user.follow(user)
    if following.save
      render json: following
    end
  end

  def destroy
    user = User.find(params[:relationship][:follow_id])
    following = current_user.unfollow(user)
    if following.destroy
      render json: following
    end
  end
end
