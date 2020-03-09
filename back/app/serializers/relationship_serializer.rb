class RelationshipSerializer < ActiveModel::Serializer
  # フォローしているユーザーを表示
  attributes :id,
             :follow,
             :user,
             :follow
end
