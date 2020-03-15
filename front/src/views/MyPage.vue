<template>
  <div class="my-page">
    <v-app>

      <v-card width="800px" class="mx-auto mt-10 mb-10">
        <v-card-text>
          <v-row>
            <v-col :cols="9">
              <!-- アバター -->
              <v-avatar color="blue" tile size="100">
                <v-icon large dark>mdi-account-circle</v-icon>
              </v-avatar>
              <!-- ユーザー名 -->
              <div class="display-1 font-weight-bold">{{ loggedInUser.name }}</div>
            </v-col>
          </v-row>

          <v-dialog v-model="dialog" persistent width="800px" class="mx-auto">
            <template v-slot:activator="{ on }">

              <!-- 編集ボタン -->
              <v-btn v-on="on">編集</v-btn>

            </template>
            <v-card width="800px" class="mx-auto">
              <v-card-title>

              </v-card-title>

              <v-card-text>
                <v-container>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
              </v-card-actions>

            </v-card>
          </v-dialog>

          <v-row>
            <!-- フォロー -->
            <v-col :cols="3">
              <router-link to="/following">
                <span class="follow-num-space title">{{ followingsNum }}</span>
                <span class="font-wight-light caption">フォロー</span>
              </router-link>
            </v-col>
            <!-- フォロワー -->
            <v-col :cols="3">
              <router-link to="/follower">
                <span class="follow-num-space title">{{ followersNum }}</span>
                <span class="font-wight-light caption">フォロワー</span>
              </router-link>
            </v-col>
          </v-row>

          <!-- プロフィール説明文 -->
          <v-row>
            <v-col><span class="yet">ここにプロフィール説明文を表示</span></v-col>
          </v-row>

          <v-divider></v-divider>

          <v-list three-line>
            <template v-for="loggedInUserPost in loggedInUser.questions">
              <v-list-item :key="loggedInUserPost.id">
                <!-- アバター -->
                <v-list-item-avatar color="blue" tile>
                  <v-icon large dark>mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <!-- タイトル -->
                  <v-list-item-title>
                    <router-link class="title font-weight-bold" to="/detail/post" @click.native="getDetailPost(loggedInUserPost.id)">{{ loggedInUserPost.title }}</router-link>
                  </v-list-item-title>
                  <!-- 投稿者と投稿日時 -->
                  <v-list-item-subtitle>
                    <v-row>
                      <v-col>投稿者：{{ loggedInUserPost.user.name }}</v-col>
                      <v-col>投稿日時：{{ loggedInUserPost.date }}</v-col>
                    </v-row>
                    <v-row>
                      <!-- いいねの数を表示 -->
                      <v-col>
                        <v-icon small :color="isLiked(loggedInUserPost.likes) ? 'pink' : ''">mdi-thumb-up</v-icon>
                        {{ Object.keys(loggedInUserPost.likes).length }}
                      </v-col>
                      <!-- コメント数を表示 -->
                      <v-col>
                        <v-icon small :color="isCommented(loggedInUserPost.comments) ? 'pink' : ''">mdi-comment-multiple</v-icon>
                        {{ Object.keys(loggedInUserPost.comments).length }}
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
  name: 'MyPage',
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    // ログイン中のユーザーの情報を表示
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
    },
    followingsNum () {
      return this.$store.state.user.followings.length
    },
    followersNum () {
      return this.$store.state.user.followers.length
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
    getLoggedInUser (id) {
      this.$store.dispatch("auth/getLoggedInUser", id)
    },
    // 投稿の詳細を取得
    getDetailPost (id) {
      this.$store.dispatch("post/getDetailPost", id)
    },
 },
 mounted () {
   this.getLoggedInUser(this.loggedInUser.id);
   // this.getLoggedInUserFollowNum(this.loggedInUser.id);
 }

}
</script>

<style lang="css" scoped>
</style>
