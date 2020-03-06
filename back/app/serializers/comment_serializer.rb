class CommentSerializer < ActiveModel::Serializer
  attributes :content,
             :user,
             :created_at

  has_one :user
  # , serializer: UserSerializer
  # has_one :question
  # , serializer: QuestionSerializer
end
