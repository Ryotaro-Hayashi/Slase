class UserSerializer < ActiveModel::Serializer

  attributes :id,
             :name,
             :email,
             :questions,
             :relationships

  has_many :questions
  has_many :relationships
end
