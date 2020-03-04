<template>
  <div class="home">
    <v-app>

      <v-card width="600px" class="mx-auto mt-10 mb-10">
        <!-- 表示切り替え -->
        <v-card-title>
          <v-icon class="icon-space">mdi-format-list-bulleted-square</v-icon>
          <span class="title font-weight-bold">latest</span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-list three-line>
            <template v-for="post in allPosts">
              <v-list-item :key="post.id">
                <!-- アバター -->
                <v-list-item-avatar color="blue" tile>
                  <v-icon large dark>mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <!-- タイトル -->
                  <v-list-item-title>
                    <router-link class="title font-weight-bold" to="/detail/post" @click.native="getDetailPost(post.id)">{{ post.title }}</router-link>
                  </v-list-item-title>
                  <!-- 投稿者と投稿日時 -->
                  <v-list-item-subtitle>
                    <v-row>
                      <v-col>投稿者：<router-link to="/detail/user" @click.native="getDetailUserPosts(post.user)">{{ post.user.name }}</router-link></v-col>
                      <v-col>投稿日時：{{ post.date }}</v-col>
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
  name: 'Home',
  data () {
    return {
      allPosts: ''
    }
  },
  methods: {
    // 投稿一覧を取得
    getAllPosts () {
      this.$http.get('http://localhost:3000/api/post/questions')
      .then(response => {
        if (response.status === 200) {
          this.allPosts = response.data
        }
      })
    },
    // 投稿の詳細を取得
    getDetailPost (id) {
      this.$store.dispatch("post/getDetailPost", id)
    },
    // 詳細表示するユーザーの投稿一覧を取得
    getDetailUserPosts (user) {
      this.$store.dispatch("post/getDetailUserPosts", user.id)
      // 詳細表示しているユーザーを更新
      this.$store.commit("auth/changeDetailUser", user)
    }
  },
  // マウント時にステートの投稿一覧を更新
  mounted () {
    this.getAllPosts();
  }
}
</script>

<style lang="css" scoped>
</style>
