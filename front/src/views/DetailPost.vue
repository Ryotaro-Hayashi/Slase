<template>
  <div class="detail-post">
    <v-app>

      <v-card width="800px" class="mx-auto mt-10">

        <v-card-title>
          <!-- アバター -->
          <v-col :cols="1">
            <router-link to="/detail/user">
              <v-avatar color="blue" tile>
                <v-icon large dark>mdi-account-circle</v-icon>
              </v-avatar>
            </router-link>
          </v-col>

          <!-- ユーザー名  -->
          <v-col :cols="6">
            <router-link to="/detail/user" @click.native="getDetailUserPosts(detailPost.user)">
              <span class="title font-weight-light">{{ detailPost.user.name }}</span>
            </router-link>
          </v-col>

          <!-- 投稿日時 -->
          <v-col :cols="5">
            <v-card-subtitle>{{ detailPost.date }}{{ detailPost.time }}に投稿</v-card-subtitle>
          </v-col>

        </v-card-title>

        <!-- タイトル -->
        <v-card-title>
          <span class="headline font-weight-bold">{{ detailPost.title }}</span>
        </v-card-title>

        <!-- 本文 -->
        <v-card-text class="font-weight-bold">{{ detailPost.body }}</v-card-text>

        <v-divider />

        <!-- コメント表示エリア -->
        <v-card-text class="font-weight-bold">コメント数、いいね数など</v-card-text>

        <v-divider />

        <!-- コメント表示エリア -->
        <v-card-text class="font-weight-bold">コメント</v-card-text>
        <v-card-text class="font-weight-bold">{{ comment }}</v-card-text>

      </v-card>

      <!-- コメント追加エリア -->
      <v-card width="800px" class="mx-auto mt-10">
        <v-card-title>コメントを追加</v-card-title>

        <!-- コメント追加フォーム -->
        <v-card-text>
          <v-textarea label="コメントを入力" outlined height="100px" v-model="comment" />
        </v-card-text>

        <!-- コメント追加ボタン -->
        <v-card-actions>
          <v-btn class="info ml-auto" @click="uploadComment">コメント</v-btn>
        </v-card-actions>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'DetailPost',
  data () {
    return {
      comment: ''
    }
  },
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
    },
    // コメントをアップロード
    uploadComment () {
      this.$http.post('http://localhost:3000/api/post/comments',
      {
        // user_id: this.
        content: this.comment
      })
      .then(response => {
        if (response.status === 200) {
          this.content = response.data
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>

</style>
