<template>
  <div class="detail-user">
    <v-app>

      <v-card width="800px" class="mx-auto mt-10 mb-10">
        <v-card-text>
          <!-- ユーザー情報 -->
          <v-row>
            <v-col>
              <v-avatar color="blue" tile size="100">
                <v-icon large dark>mdi-account-circle</v-icon>
              </v-avatar>
              <div class="display-1 font-weight-bold">{{ detailUser.name }}</div>
            </v-col>
            <v-col>
              <v-btn @click="follow">フォロー</v-btn>
            </v-col>
          </v-row>

          <!-- プロフィール説明文 -->
          <v-row>
            <v-col><span class="yet">ここにプロフィール説明文を表示</span></v-col>
          </v-row>

          <v-divider></v-divider>

          <v-list three-line>
            <template v-for="detailUserPost in detailUserPosts">
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
    avatarUrl: '',
    avatarFile: ''
  }),
  computed: {
    detailUserPosts () {
      return this.$store.state.post.detailUserPosts
    },
    detailUser () {
      return this.$store.state.auth.detailUser
    },
    token () {
      return this.$store.state.auth.token
    }
  },
  methods: {
    // 投稿の詳細を取得
    getDetailPost (id) {
      this.$store.dispatch("post/getDetailPost", id)
    },
    follow () {
      this.$http.post('http://localhost:3000/api/relationships',
      {
        follow_id: this.detailUser.id
      },
      {
        headers: this.token
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
