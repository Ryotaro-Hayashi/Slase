class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :content, null: false

      t.string :date
      t.string :time

      t.references :user
      t.references :question

      t.timestamps
    end
  end
end
