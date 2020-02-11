class Question < ApplicationRecord
  # ユーザーモデルと一対一でリレーション
  belongs_to :user

  mount_uploader :image, ImageUploader
end
