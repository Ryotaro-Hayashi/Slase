class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|

      t.string :title, null: false
      t.text :body, null: false

      t.references :user

      t.timestamps
    end
  end
end
