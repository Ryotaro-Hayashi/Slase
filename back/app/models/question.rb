class Question < ApplicationRecord

  # ユーザーモデルと一対一でリレーション
  belongs_to :user
  has_many :comments

  mount_uploader :image, ImageUploader

  validates :title, presence: true, length: { maximum: 50 }

  validates :body, presence: true
end
