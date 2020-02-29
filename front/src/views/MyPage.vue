<template>
<div class="mypage">
  <v-app>
    <v-card width="1200px" class="mx-auto mt-10 mb-10">
      <v-card-text>
        <v-row>
          <v-col class="yet">ここにプロフィール詳細を表示</v-col>

          <v-col>
            <v-row>
              <v-col>
                <v-avatar color="blue" tile size="100">
                  <v-icon large dark>mdi-account-circle</v-icon>
                </v-avatar>
                <div class="display-1 font-weight-bold">{{ loggedInUser.name }}</div>
              </v-col>
              <v-col>ここにフォローボタンを表示</v-col>
            </v-row>

            <v-row>
              <v-col><span class="yet">ここにプロフィール説明文を表示</span></v-col>
            </v-row>

            <v-divider></v-divider>

            <v-list three-line>
              <template v-for="myPost in myPosts">
                <v-list-item :key="myPost.id">
                  <v-list-item-avatar color="blue" tile>
                    <v-icon large dark>mdi-account-circle</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title><router-link class="title font-weight-bold" to="/posting" @click.native="getId(myPost.id)">{{ myPost.title }}</router-link></v-list-item-title>
                    <v-list-item-subtitle>
                      <v-row>
                        <v-col>投稿者：{{ myPost.user.name }}</v-col>
                        <v-col>投稿日時：{{ myPost.date }}</v-col>
                      </v-row>
                    </v-list-item-subtitle>
                    <v-divider></v-divider>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'MyPage',
  computed: {
    // ログイン中のユーザーの情報を表示
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
    },
    // ログイン中のユーザーの投稿一覧表示
    myPosts () {
      return this.$store.state.post.myQuestions
    }
  },
  methods: {
    // ログイン中のユーザーの投稿一覧を更新
    getMyPosts () {
      this.$store.dispatch("post/myposts", this.loggedInUser.id)
    },
    // 詳細表示する投稿情報を更新
    getId (id) {
      this.$store.dispatch("post/posting", id)
    }
 },
 // マウント時にログイン中のユーザーの投稿一覧を更新
 mounted: function () {
   this.getMyPosts()
 }

}
</script>

<style lang="css" scoped>
</style>
