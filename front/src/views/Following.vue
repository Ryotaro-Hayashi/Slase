<template>
  <div class="following">
    <v-app>

      <v-card width="600px" class="mx-auto mt-10 mb-10">
        <!-- 表示切り替え -->
        <v-card-title>
          <v-icon class="icon-space">mdi-format-list-bulleted-square</v-icon>
          <span class="title font-weight-bold">Follow{{ detailUser }}</span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-list three-line>
            <template v-for="following in followings">
              <v-list-item :key="following.id">
                <!-- アバター -->
                <v-list-item-avatar color="blue" tile>
                  <v-icon large dark>mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <!-- 名前-->
                  <v-list-item-title>
                    <router-link class="title font-weight-bold" to="/detail/user" @click.native="getDetailUserPosts(following)">{{ following.name }}</router-link>
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
  name: 'Following',
  data () {
    return {
      followings: ''
    }
  },
  computed: {
    detailUser () {
      return this.$store.state.auth.detailUser
    }
  },
  methods: {
    // フォローしているユーザーを取得
    getFollowings () {
      this.$http.get('http://localhost:3000/api/followings/' + this.detailUser.id)
      .then(response => {
        if (response.status === 200) {
          this.followings = response.data
        }
      })
    },
    // 詳細表示するユーザーの投稿一覧を取得
    getDetailUserPosts (user) {
      this.$store.dispatch("post/getDetailUserPosts", user.id)
      // 詳細表示しているユーザーを更新
      this.$store.commit("auth/changeDetailUser", user)
    }
  },
  // マウント時にフォローしているユーザーを取得
  mounted () {
    this.getFollowings();
  }
}
</script>

<style lang="css" scoped>
</style>
