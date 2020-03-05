class Comment < ApplicationRecord
  belogns_to :user
  belogns_to :question
end
