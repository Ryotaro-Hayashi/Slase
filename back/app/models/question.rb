class Question < ApplicationRecord

  # ユーザーモデルと一対一でリレーション
  belongs_to :user

  mount_uploader :image, ImageUploader

  validates :title, presence: true, length: { maximum: 50 }

  validates :body, presence: true
end
