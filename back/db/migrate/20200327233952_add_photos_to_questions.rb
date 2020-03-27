class AddPhotosToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :photos, :json
  end
end
