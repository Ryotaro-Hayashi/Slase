<template>
  <div class="sign-in-follower">
    <v-app>

      <v-card width="600px" class="mx-auto mt-10 mb-10">
        <!-- 表示切り替え -->
        <v-card-title>
          <v-icon class="icon-space">mdi-format-list-bulleted-square</v-icon>
          <span class="title font-weight-bold">Follower</span>
          <!-- !!!!!!!!!!!!!!!!!! -->
          <v-btn @click="getFollowers(loggedInUser.id)">同期</v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-list three-line>
            <template v-for="follower in followers">
              <v-list-item :key="follower.id">
                <!-- アバター -->
                <v-list-item-avatar color="blue" tile>
                  <v-icon large dark>mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <!-- 名前-->
                  <v-list-item-title>
                    <router-link class="title font-weight-bold" to="/detail/user" @click.native="getDetailUserPosts(follower)">{{ follower.name }}</router-link>
                  </v-list-item-title>
                  <!-- プロフィール説明文 -->
                  <v-list-item-subtitle>
                    プロフィール説明文
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
  name: 'SignInFollower',
  data () {
    return {

    }
  },
  computed: {
    detailUser () {
      return this.$store.state.auth.detailUser
    },
    followers () {
      return this.$store.state.option.followers
    },
    // ログイン中のユーザーの情報を表示
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
    }
  },
  methods: {
    // フォロワーを取得
    getFollowers (id) {
      this.$store.dispatch("option/getFollowers", id)
    },
    // 詳細表示するユーザーの投稿一覧を取得
    getDetailUserPosts (user) {
      this.$store.dispatch("post/getDetailUserPosts", user.id)
      // 詳細表示しているユーザーを更新
      this.$store.commit("auth/changeDetailUser", user)
    }
  },
  // マウント時にフォロワーを取得
  mounted () {
    this.getFollowers(this.loggedInUser.id);
  }
}
</script>

<style lang="css" scoped>
</style>
