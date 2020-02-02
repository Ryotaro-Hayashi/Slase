class Question < ApplicationRecord
  # ユーザーモデルと一対一でリレーション
  belongs_to :user

  # def user
  #   #インスタンスメソッドないで、selfはインスタンス自身を表す
  #   return User.find_by(id: self.user_id)
  # end
end
