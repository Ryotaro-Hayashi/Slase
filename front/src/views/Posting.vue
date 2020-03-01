<template>
<div class="posting">
  <v-app>
    <v-card width="800px" class="mx-auto mt-10">
      <v-card-title>

        <v-col :cols="1">
          <router-link to="/user">
            <v-avatar color="blue" tile>
              <v-icon large dark>mdi-account-circle</v-icon>
            </v-avatar>
          </router-link>
        </v-col>

        <v-col :cols="6">
          <router-link to="/user" @click.native="getDetailUserPosts(detailPost.user)">
            <span class="title font-weight-light">{{ detailPost.user.name }}</span>
          </router-link>
        </v-col>

        <v-col :cols="5">
          <v-card-subtitle>{{ detailPost.date }}{{ detailPost.time }}に投稿</v-card-subtitle>
        </v-col>
      </v-card-title>

      <v-card-title><span class="headline font-weight-bold">{{ detailPost.title }}</span></v-card-title>


      <v-card-text class="font-weight-bold">
      <h3>{{ detailPost.body }}</h3>
      </v-card-text>

    </v-card>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'Posting',
  computed: {
    // 投稿の詳細表示
    detailPost () {
      return this.$store.state.post.detailPost
    }
  },
  methods: {
    // 詳細表示するユーザーの投稿一覧を取得
    getDetailUserPosts (user) {
      this.$store.dispatch("post/getDetailUserPosts", user.id)
      // 詳細表示しているユーザーを更新
      this.$store.commit("auth/changeDetailUser", user)
    }
  }

}
</script>

<style lang="css" scoped>

</style>
