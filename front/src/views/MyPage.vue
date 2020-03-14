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
                  <!-- ユーザー名 -->
                  <div class="display-1 font-weight-bold">{{ loggedInUser.name }}</div>
                </v-col>
              </v-row>

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
