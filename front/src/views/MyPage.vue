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
                  <div class="display-1 font-weight-bold">{{ loggedInUserInfo.name }}</div>
                </v-col>
              </v-row>

              <v-row>
                <!-- フォロー -->
                <v-col :cols="3">
                  <router-link to="/following">
                    <span class="follow-num-space title">{{ loggedInUserFollowingsNum }}</span>
                    <span class="font-wight-light caption">フォロー</span>
                  </router-link>
                </v-col>
                <!-- フォロワー -->
                <v-col :cols="3">
                  <router-link to="/follower">
                    <span class="follow-num-space title">{{ loggedInUserFollowersNum }}</span>
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
                <template v-for="loggedInUserPost in loggedInUserInfo.questions">
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
    loggedInUserInfo () {
      return this.$store.state.auth.loggedInUserInfo
    },
    loggedInUserFollowingsNum () {
      return this.$store.state.option.loggedInUserFollowingsNum
    },
    loggedInUserFollowersNum () {
      return this.$store.state.option.loggedInUserFollowersNum
    }
  },
  methods: {
    getLoggedInUserInfo (id) {
      this.$store.dispatch("auth/getLoggedInUserInfo", id)
    },
    // 投稿の詳細を取得
    getDetailPost (id) {
      this.$store.dispatch("post/getDetailPost", id)
    },
    // ログインユーザーのフォロー数・フォロワー数を取得
    getLoggedInUserFollowNum (id) {
      this.$store.dispatch("option/getLoggedInUserFollowNum", id)
    }
 },
 mounted () {
   this.getLoggedInUserInfo(this.loggedInUser.id);
   // this.getLoggedInUserFollowNum(this.loggedInUser.id);
 }

}
</script>

<style lang="css" scoped>
</style>
