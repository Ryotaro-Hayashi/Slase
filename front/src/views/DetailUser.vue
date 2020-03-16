<template>
  <div class="detail-user">
    <v-app>

      <v-card width="800px" class="mx-auto mt-10 mb-10">
        <v-card-text>
          <!-- ユーザー情報 -->
          <v-row>
            <v-col :cols=9>
              <v-avatar color="blue" tile size="100">
                <v-icon large dark>mdi-account-circle</v-icon>
              </v-avatar>
              <div class="display-1 font-weight-bold">{{ detailUser.name }}</div>
            </v-col>
            <v-col :cols=3 v-if="loggedIn">
              <!-- フォローしていなければフォローボタンを表示 -->
              <v-btn @click="follow" v-if="!isFollowing()">
                <v-icon class="icon-space">mdi-account-plus</v-icon>フォロー
              </v-btn>
              <!-- フォローしていればアンフォローボタンを表示 -->
              <v-btn @click="unfollow" v-else>
                <v-icon class="icon-space">mdi-account-minus</v-icon>フォローを外す
              </v-btn>
            </v-col>
          </v-row>

          <!-- プロフィール説明 -->
          <v-row>
            <v-col>{{ detailUser.introduce }}</v-col>
            <v-col><v-icon>mdi-map-marker</v-icon>{{ detailUser.address }}</v-col>
          </v-row>

          <v-divider></v-divider>

          <v-list three-line>
            <template v-for="detailUserPost in detailUser.questions">
              <v-list-item :key="detailUserPost.id">
                <!-- アバター -->
                <v-list-item-avatar color="blue" tile>
                  <v-icon large dark>mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <!-- タイトル -->
                  <v-list-item-title><router-link class="title font-weight-bold" to="/detail/post" @click.native="getDetailPost(detailUserPost.id)">{{ detailUserPost.title }}</router-link></v-list-item-title>
                  <!-- 投稿者と投稿日時 -->
                  <v-list-item-subtitle>
                    <v-row>
                      <v-col>投稿者：{{ detailUserPost.user.name }}</v-col>
                      <v-col>投稿日時：{{ detailUserPost.date }}</v-col>
                    </v-row>
                    <v-row>
                      <!-- いいねの数を表示 -->
                      <v-col>
                        <v-icon small :color="isLiked(detailUserPost.likes) ? 'pink' : ''">mdi-thumb-up</v-icon>
                        {{ Object.keys(detailUserPost.likes).length }}
                      </v-col>
                      <!-- コメント数を表示 -->
                      <v-col>
                        <v-icon small :color="isCommented(detailUserPost.comments) ? 'pink' : ''">mdi-comment-multiple</v-icon>
                        {{ Object.keys(detailUserPost.comments).length }}
                      </v-col>
                    </v-row>
                  </v-list-item-subtitle>
                  <v-divider></v-divider>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>

        </v-card-text>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'DetailUser',
  data: () => ({

  }),
  computed: {
    loggedIn () {
      return this.$store.state.auth.loggedIn
    },
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
    },
    detailUser () {
      return this.$store.state.user.detailUser
    },
    token () {
      return this.$store.state.auth.token
    },
    followings () {
      return this.$store.state.user.followings
    },
    // いいねしてれば、trueを返す
    isLiked: function () {
      return function (likes) {
        for (var like of likes) {
          if (like.user_id === this.loggedInUser.id) {
            return true
          }
        }
      }
    },
    // コメントしてれば、trueを返す
    isCommented: function () {
      return function (comments) {
        for (var comment of comments) {
          if (comment.user.id === this.loggedInUser.id) {
            return true
          }
        }
      }
    }
  },
  methods: {
    // 投稿の詳細を取得
    getDetailPost (id) {
      this.$store.dispatch("post/getDetailPost", id)
    },
    // ユーザーをフォローするメソッド
    follow () {
      this.$http.post('http://localhost:3000/api/relationships',
      {
        // フォローするユーザーのid
        follow_id: this.detailUser.id
      },
      {
        // トークンをrailsに送ることでcurrent_api_userを使える
        headers: this.token
      })
      .then(response => {
        if (response.status === 200) {
          // 成功したらフォロー・フォロワーを更新
          this.$store.dispatch("auth/getLoggedInUser", this.loggedInUser.id)
          this.$store.dispatch("user/getFollows", this.loggedInUser.id)
        }
      });
    },
    // フォローを外す
    unfollow () {
      this.$http.delete('http://localhost:3000/api/relationships/' + this.detailUser.id,
      {
        headers: this.token
      })
      .then(response => {
        if (response.status === 200) {
          // 成功したらフォロー・フォロワーを更新
          this.$store.dispatch("auth/getLoggedInUser", this.loggedInUser.id)
          this.$store.dispatch("user/getFollows", this.loggedInUser.id)
        }
      });
    },
    // フォローしているユーザーの中に詳細表示しているユーザーのidが含まれているかを確認
    isFollowing () {
      // フォローしているユーザーの1つ1つについて
      const followings = this.followings.find(follow => {
        // 詳細表示しているユーザーのidが一致するかを確認
        return follow.id === this.detailUser.id
      });
      if (followings) {
        return true
      }
      else {
        return false
      }
    },

  }
}
</script>

<style lang="css" scoped>
</style>
