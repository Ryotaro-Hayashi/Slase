class UserSerializer < ActiveModel::Serializer
  # user.question を利用可能にする
  attributes :id,
             :name,
             :email,
             :created_at

  has_many :questions
  # , serializer: QuestionSerializer
  has_many :comments
  # , serializer: CommentSerializer
end
