class QuestionSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :body,
             :user

  has_one :user
end
