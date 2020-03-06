class CommentSerializer < ActiveModel::Serializer
  attributes :content,
             :user,
             :created_at,
             :date,
             :time

  has_one :user
end
