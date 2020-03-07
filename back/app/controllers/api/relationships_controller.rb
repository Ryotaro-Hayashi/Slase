class Api::RelationshipsController < ApplicationController
  def create
    user = User.find(params[:relationship][:follow_id])
    # モデルで定義したインスタンスメソッドでフォロー
    # followメソッドはrelationshipモデルを返す
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

  def index
    relationship = Relationship.all
    render json: relationship
  end

  def relevance
    user = User.find(params[:user_id])
    render json: user.relationships
  end

end
