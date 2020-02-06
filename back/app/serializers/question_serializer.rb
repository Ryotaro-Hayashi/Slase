class QuestionSerializer < ActiveModel::Serializer
  # question.user を利用可能にする

  attributes :id,
             :title,
             :body,
             :date,
             :created_at,
             :user

  has_one :user
end
