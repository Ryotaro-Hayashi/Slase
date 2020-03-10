class CommentSerializer < ActiveModel::Serializer
  attributes :content,
             :user,
             :date,
             :time

end
