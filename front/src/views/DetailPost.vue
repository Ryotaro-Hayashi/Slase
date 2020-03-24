<template>
  <div class="detail-post">
    <v-app>

      <v-card width="95%" max-width="600px" class="mx-auto">

        <v-card-title>
          <!-- アバター -->
          <v-col :cols="1">
            <router-link to="/detail/user" @click.native="getDetailUser(detailPost.user.id)">
              <v-avatar color="blue" tile>
                <v-icon large dark>mdi-account-circle</v-icon>
              </v-avatar>
            </router-link>
          </v-col>

          <!-- ユーザー名  -->
          <v-col :cols="5">
            <router-link to="/detail/user" @click.native="getDetailUser(detailPost.user.id)">
              <span class="title font-weight-light">{{ detailPost.user.name }}</span>
            </router-link>
          </v-col>

          <!-- 投稿日時 -->
          <v-col :cols="4">
            <v-card-subtitle>{{ detailPost.date }}{{ detailPost.time }}に投稿</v-card-subtitle>
          </v-col>

          <!-- いいねボタン -->
          <v-col :cols="2">
            <!-- いいねしていないとき -->
            <v-btn icon @click="unlike" v-if="isLiked()" color="pink">
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <!-- いいねしているとき -->
            <v-btn icon @click="like" v-else>
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
          </v-col>

        </v-card-title>

        <!-- タイトル -->
        <v-card-title>
          <span class="headline font-weight-bold">{{ detailPost.title }}</span>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <!-- 本文 -->
          {{ detailPost.body }}
          <v-card-actions />

          <!-- コメントがあれば表示 -->
          <span v-if="commentExist(detailPost.comments)">
            <v-divider />

            <v-card-actions class="mt-5">
              <v-icon class="icon-space">mdi-comment-multiple</v-icon>
              コメント
            </v-card-actions>

            <!-- コメントをリスト表示 -->
            <v-list three-line>
              <template v-for="eachComment in detailPost.comments">
                <v-list-item :key="eachComment.id">
                  <!-- アバター -->
                  <router-link to="/detail/user" @click.native="getDetailUser(eachComment.user.id)">
                    <v-list-item-avatar color="blue" tile>
                      <v-icon dark>mdi-account-circle</v-icon>
                    </v-list-item-avatar>
                  </router-link>

                  <v-list-item-content>
                    <v-row>
                      <v-col>
                        <!-- コメント投稿者 -->
                        <router-link to="/detail/user" @click.native="getDetailUser(eachComment.user.id)">
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

          </span>
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
      comment: '',
    }
  },
  computed: {
    // 投稿の詳細表示
    detailPost () {
      return this.$store.state.post.detailPost
    },
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
    },
    token () {
      return this.$store.state.auth.token
    },
    // コメントが存在すればtrueを返す
    commentExist: function () {
      return function (comments) {
        if (Object.keys(comments).length === 0) {
          return false
        } else {
          return true
        }
      }
    }
  },
  methods: {
    getDetailUser (id) {
      this.$store.dispatch("user/getDetailUser", id)
    },
    // コメントをアップロード
    uploadComment () {
      this.$http.post(process.env.VUE_APP_API_BASE_URL + '/api/post/comments',
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
    },
    // いいねを登録
    like () {
      this.$http.post(process.env.VUE_APP_API_BASE_URL + '/api/post/likes',
      {
        question_id: this.detailPost.id
      },
      {
        headers: this.token
      })
      .then(response => {
        if (response.status === 200) {
          // 詳細表示している投稿をいいねしたことを更新
          this.$store.dispatch("post/getDetailPost", this.detailPost.id)
        }
      })
    },
    // いいねを外す
    unlike () {
      this.$http.delete(process.env.VUE_APP_API_BASE_URL + '/api/post/likes/' + this.detailPost.id,
      {
        question_id: this.detailPost.id,
        user_id: this.loggedInUser.id
      })
      .then(response => {
        if (response.status === 200) {
          this.$store.dispatch("post/getDetailPost", this.detailPost.id)
        }
      })
    },
    // いいねしてれば、trueを返す
    isLiked () {
      const likes = this.detailPost.likes.find(like => {
        return like.user_id === this.loggedInUser.id
      })
      if (likes) {
        return true
      }
      else {
        return false
      }
    }
  }
}
</script>

<style lang="css" scoped>

</style>
