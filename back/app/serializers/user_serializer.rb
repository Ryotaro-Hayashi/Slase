class UserSerializer < ActiveModel::Serializer
  # user.question を利用可能にする
  attributes :id,
             :name,
             :email,
             :created_at

end
