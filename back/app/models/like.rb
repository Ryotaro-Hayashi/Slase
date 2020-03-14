class Like < ApplicationRecord
  belongs_to :question
  belongs_to :user

  # いいねが重複して登録されないようにvalidates
  validates_uniqueness_of :post_id, scope: :user_id
end
