class QuestionSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :body,
             :created_at,
             :user

  has_one :user
end
