class CreateRelationships < ActiveRecord::Migration[5.2]
  def change
    create_table :relationships do |t|
      # 外部キーでuserモデルを参照する
      t.references :user, foreign_key: true
      t.references :follow, foreign_key: { to_table: :users }

      t.timestamps

      # user_id と follow_id のペアで重複するものが保存されないために設定
      t.index [:user_id, :follow_id], unique: true
    end
  end
end
