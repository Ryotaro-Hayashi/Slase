class UserSerializer < ActiveModel::Serializer

  attributes :id,
             :name,
             :email,
             :questions

  has_many :questions
end
