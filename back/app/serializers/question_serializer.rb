class QuestionSerializer < ActiveModel::Serializer
  # question.user を利用可能にする

  attributes :id,
             :title,
             :body,
             :image,
             :date,
             :time,
             :user,
             :comments

  has_many :comments

end
