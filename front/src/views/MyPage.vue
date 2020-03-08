<template>
  <div class="my-page">
    <v-app>

      <v-card width="1200px" class="mx-auto mt-10 mb-10">
        <v-card-text>
          <v-row>
            <!-- プロフィール編集？詳細？表示 -->
            <v-col class="yet">ここにプロフィール詳細を表示</v-col>
            <v-col>
              <v-row>
                <!-- アバター -->
                <v-col>
                  <v-avatar color="blue" tile size="100">
                    <v-icon large dark>mdi-account-circle</v-icon>
                  </v-avatar>
                  <div class="display-1 font-weight-bold">{{ loggedInUser.name }}</div>
                </v-col>
                <v-col>
                  <v-btn to="/following">フォロー{{ followingsNum }}</v-btn>
                  <v-btn to="/follower">フォロワー{{ followersNum }}</v-btn>
                </v-col>
              </v-row>

              <!-- プロフィール説明文 -->
              <v-row>
                <v-col><span class="yet">ここにプロフィール説明文を表示</span></v-col>
              </v-row>

              <v-divider></v-divider>

              <v-list three-line>
                <template v-for="loggedInUserPost in loggedInUserPosts">
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
  data () {
    return {
      followingsNum: {},
      followersNum: {}
    }
  },
  computed: {
    // ログイン中のユーザーの情報を表示
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
    },
    // ログイン中のユーザーの投稿一覧表示
    loggedInUserPosts () {
      return this.$store.state.post.detailUserPosts
    },
    detailUser () {
      return this.$store.state.auth.detailUser
    }
  },
  methods: {
    // 投稿の詳細を取得
    getDetailPost (id) {
      this.$store.dispatch("post/getDetailPost", id)
    },
    getNum () {
      this.$http.get('http://localhost:3000/api/followings/num/' + this.detailUser.id)
      .then(response => {
        if (response.status === 200) {
          this.followingsNum = response.data
        }
      })
      this.$http.get('http://localhost:3000/api/followers/num/' + this.detailUser.id)
      .then(response => {
        if (response.status === 200) {
          this.followersNum = response.data
        }
      })
    }
 },
 beforeUpdate () {
   this.getNum();
 }

}
</script>

<style lang="css" scoped>
</style>
