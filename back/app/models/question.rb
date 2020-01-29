class Question < ApplicationRecord
  # ユーザーモデルと一対一でリレーション
  belongs_to :user
end
