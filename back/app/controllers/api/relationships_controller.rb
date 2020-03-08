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
    user = User.find(params[:id])
    following = current_api_user.unfollow(user)
    if following.destroy
      render json: following
    end
  end

  def index
    relationship = Relationship.all
    render json: relationship
  end

  # エンドポイントのidを使ってそのユーザーのフォローしているユーザーを返す
  def followings
    user = User.find(params[:user_id])
    render json: user.followings
  end

  # そのユーザーのフォロワーを返す
  def followers
    user = User.find(params[:user_id])
    render json: user.followers
  end

  # フォローしている人数を返す
  def num_followings
    user = User.find(params[:user_id])
    render json: user.followings.count
  end

  def num_followers
    user = User.find(params[:user_id])
    render json: user.followers.count
  end

end
