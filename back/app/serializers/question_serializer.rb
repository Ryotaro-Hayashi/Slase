class QuestionSerializer < ActiveModel::Serializer
  # question.user を利用可能にする

  attributes :id,
             :title,
             :body,
             :image,
             :date,
             :time,
             :user,
             :comments,
             :likes

  has_many :comments
  has_many :likes

end
