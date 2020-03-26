class UserSerializer < ActiveModel::Serializer

  attributes :id,
             :name,
             :email,
             :introduce,
             :address,
             :avatar,
             :questions

  has_many :questions
end
