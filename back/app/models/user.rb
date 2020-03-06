# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  # questionsを紐付け
  has_many :questions

  has_many :comments

  # name は空なしで最大50文字で一意性あり
  validates :name, presence: true, length: { maximum: 50 }, uniqueness: true

  # emailは空なしで一意性あり, validatesは /back/config/initializers/devise.rb で定義
  # passwordも空なしで一意性なし, email と同じところで定義されている

  has_many :relationships
  # 架空のfollowingクラスを作成、中間テーブルとしてrelationshipsを設定、follow_idを参考にしてfollowingsモデルにアクセス
  has_many :followings, through: :relationships, source: :follow
  # 架空のクラス、relationshipモデルを設定を補足、relationshipsテーブルのアクセスをfollow_idを通して行うよう設定
  has_many :reverse_of_relationships, class_name: 'Relationship', foreign_key: 'follow_id'
  has_many :followers, through: :reverse_of_relationships, source: :user
end
