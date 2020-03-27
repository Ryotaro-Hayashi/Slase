<template>
  <div class="detail-post">
    <v-app>

      <v-card width="95%" max-width="600px" class="mx-auto mt-10">
        <v-card-text>
          <v-container>
            <v-row dense align=center>
              <!-- アバター -->
              <v-col cols="2" sm="1" md="1" lg="1">
                <router-link to="/detail/user" @click.native="getDetailUser(detailPost.user.id)">
                  <v-avatar tile>
                    <img :src="detailPost.user.avatar.url">
                  </v-avatar>
                </router-link>
              </v-col>

              <!-- ユーザー名  -->
              <v-col cols="8" sm="9" md="9" lg="9">
                <v-card-title>
                <router-link to="/detail/user" @click.native="getDetailUser(detailPost.user.id)">
                  <span class="title font-weight-light">{{ detailPost.user.name }}</span>
                </router-link>
              </v-card-title>
              </v-col>

              <!-- いいねボタン -->
              <v-col cols="2" sm="2" md="2" lg="2">
                <!-- いいねしているとき -->
                <v-btn icon @click="unlike" v-if="isLiked()" color="pink">
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
                <!-- いいねしていないとき -->
                <v-btn icon @click="like" v-else>
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
              </v-col>

              <!-- 投稿日時 -->
              <v-col cols="12" sm="12" md="12" lg="12">
                {{ detailPost.date }}{{ detailPost.time }}に投稿
              </v-col>

            </v-row>

            <!-- タイトル -->
            <v-row>
              <v-col class="headline font-weight-bold">
                {{ detailPost.title }}
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <!-- 本文 -->
                <strong style="white-space:pre-wrap; word-wrap:break-word;">
                  {{ detailPost.body }}
                </strong>
              </v-col>
              <v-col cols="12">
                <!-- S3では、srcをバインドしないと正しく表示されない -->
                <v-img :src="detailPost.image.url"></v-img>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>

        <v-card-text class="font-weight-bold">

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
                    <!-- コメント主のアバター -->
                    <v-list-item-avatar tile>
                      <img :src="eachComment.user.avatar.url">
                    </v-list-item-avatar>

                  <v-list-item-content>
                    <v-row dense>
                      <v-col cols="12">
                        <v-list-item-title>
                          <!-- コメント投稿者 -->
                          <router-link to="/detail/user" @click.native="getDetailUser(eachComment.user.id)">
                            {{ eachComment.user.name }}
                          </router-link>
                        </v-list-item-title>
                      </v-col>

                      <v-col cols="12">
                        <!-- コメント投稿日時 -->
                        <v-list-item-subtitle>
                          {{ eachComment.date }}{{ eachComment.time}}
                        </v-list-item-subtitle>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <!-- コメント内容 -->
                        <v-list-item-text>
                          {{ eachComment.content }}
                        </v-list-item-text>
                      </v-col>
                    </v-row>

                    <v-divider></v-divider>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>

          </span>
        </v-card-text>

      </v-card>

      <!-- コメント追加エリア -->
      <v-card width="95%" max-width="600px" class="mx-auto mt-10">
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
        question_id: this.detailPost.id,
        user_id: this.loggedInUser.id
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
