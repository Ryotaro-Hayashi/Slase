# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  # questionsを紐付け
  has_many :questions

  # uploaderをuserにマウント
  mount_uploader :avatar, AvatarUploader

  # name は空なしで最大50文字で一意性あり
  validates :name, presence: true, length: { maximum: 50}, uniqueness: true

  # emailは空なしで一意性あり, validatesは /back/config/initializers/devise.rb で定義
  # passwordも空なしで一意性なし, email と同じところで定義されている
end
