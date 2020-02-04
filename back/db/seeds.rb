# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# サンプルユーザーの作成
User.create(name: "testman", email: "test@example.com", password: "testpass")
User.create(name: "testman2", email: "test2@example.com", password: "testpass2")
User.create(name: "testman3", email: "test3@example.com", password: "testpass3")
