class UserSerializer < ActiveModel::Serializer
  # user.question を利用可能にする
  attributes :id,
             :name,
             :email,
             :avatar,
             :created_at,
             :password

  has_many :questions
end
