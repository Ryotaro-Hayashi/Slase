class RelationshipSerializer < ActiveModel::Serializer
  # フォローしているユーザーを表示
  attributes :follow
end
