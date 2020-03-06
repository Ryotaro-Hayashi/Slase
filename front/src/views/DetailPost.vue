<template>
  <div class="detail-post">
    <v-app>

      <v-card width="800px" class="mx-auto mt-10">

        <v-card-title>
          <!-- アバター -->
          <v-col :cols="1">
            <router-link to="/detail/user" @click.native="getDetailUserPosts(detailPost.user)">
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

        <!-- good, bad, コメント数 -->
        <v-card-text class="font-weight-bold">コメント数、いいね数など</v-card-text>

        <v-divider />


        <v-card-text>
          <!-- コメントをリスト表示 -->
          <v-list three-line>
            <template v-for="eachComment in detailPost.comments">
              <v-list-item :key="eachComment.id">
                <!-- アバター -->
                <router-link to="/detail/user" @click.native="getDetailUserPosts(eachComment.user)">
                  <v-list-item-avatar color="blue" tile>
                    <v-icon large dark>mdi-account-circle</v-icon>
                  </v-list-item-avatar>
                </router-link>

                <v-list-item-content>
                  <v-row>
                    <v-col>
                      <!-- コメント投稿者 -->
                      <router-link to="/detail/user" @click.native="getDetailUserPosts(eachComment.user)">
                        <v-list-item-title>
                          {{ eachComment.user.name }}
                        </v-list-item-title>
                      </router-link>
                    </v-col>

                    <v-col>
                      <!-- コメント投稿日時 -->
                      <v-list-item-subtitle>
                        {{ eachComment.date }}{{ eachComment.time}}
                      </v-list-item-subtitle>
                    </v-col>
                  </v-row>

                  <!-- コメント内容 -->
                  <v-list-item-text>
                    {{ eachComment.content }}
                  </v-list-item-text>

                  <v-divider></v-divider>
                </v-list-item-content>
              </v-list-item>
            </template>
        </v-list>
        </v-card-text>


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
    },
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
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
        user_id: this.loggedInUser.id,
        content: this.comment,
        question_id: this.detailPost.id
      })
      .then(response => {
        if (response.status === 200) {
          // コメントを反映した投稿一覧を更新
          this.$store.dispatch("post/getDetailPost", this.detailPost.id)
          // コメントフォームの文字を削除
          this.comment = ''
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>

</style>
