class UserSerializer < ActiveModel::Serializer

  attributes :id,
             :name,
             :email,
             :introduce,
             :address,
             :questions

  has_many :questions
end
