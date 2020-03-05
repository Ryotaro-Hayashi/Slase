class QuestionSerializer < ActiveModel::Serializer
  # question.user を利用可能にする

  attributes :id,
             :title,
             :body,
             :image,
             :date,
             :time,
             :created_at,
             :user

  has_one :user
  has_many :comments
end
