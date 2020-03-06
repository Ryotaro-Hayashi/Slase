class Relationship < ApplicationRecord
  belongs_to :user
  # 存在しないfollowクラスへの参照を防ぎ、userクラスを参照
  belongs_to :follow, class_name: 'User'

  validates :user_id, presence: true
  validates :follow_id, presence: true
end
