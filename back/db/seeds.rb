User.create(name: "ゲスト", email: "guest@guest.com", password: "guestpass")
User.create(name: "testman", email: "test@example.com", password: "testpass")
User.create(name: "testman2", email: "test2@example.com", password: "testpass2")
User.create(name: "testman3", email: "test3@example.com", password: "testpass3")

Question.create(title: "1回目のtitle", body: "1回目のbody", user_id: 3, date: "2020年3月1日", time: "01:00")
Question.create(title: "2回目のtitle", body: "2回目のbody", user_id: 3, date: "2020年3月2日", time: "02:00")

Question.create(title: "1回目のtitle", body: "1回目のbody", user_id: 2, date: "2020年2月1日", time: "01:00")
Question.create(title: "2回目のtitle", body: "2回目のbody", user_id: 2, date: "2020年2月2日", time: "02:00")

Question.create(title: "1回目のtitle", body: "1回目のbody", user_id: 1, date: "2020年1月1日", time: "01:00")
Question.create(title: "2回目のtitle", body: "2回目のbody", user_id: 1, date: "2020年1月2日", time: "02:00")
