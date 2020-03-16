class UserSerializer < ActiveModel::Serializer

  attributes :id,
             :name,
             :email,
             :introduce,
             :age,
             :sex,
             :address,
             :questions

  has_many :questions
end
