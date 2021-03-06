class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|

      t.string :title, null: false
      t.text :body, null: false

      t.string :date
      t.string :time
      t.string :image

      # 誰が投稿したかが分かるようにuser.idを追加する
      t.references :user
      t.references :comment

      t.timestamps
    end
  end
end
