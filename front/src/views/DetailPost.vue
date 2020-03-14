<template>
  <div class="detail-post">
    <v-app>

      <v-card width="800px" class="mx-auto mt-10">

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
          <v-col :cols="6">
            <router-link to="/detail/user" @click.native="getDetailUser(detailPost.user.id)">
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
        <v-card-text class="font-weight-bold">
          <v-btn icon @click="like">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon color="pink">
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider />


        <v-card-text>
          <!-- コメントをリスト表示 -->
          <v-list three-line>
            <template v-for="eachComment in detailPost.comments">
              <v-list-item :key="eachComment.id">
                <!-- アバター -->
                <router-link to="/detail/user" @click.native="getDetailUser(eachComment.user.id)">
                  <v-list-item-avatar color="blue" tile>
                    <v-icon large dark>mdi-account-circle</v-icon>
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
    },
    token () {
      return this.$store.state.auth.token
    }
  },
  methods: {
    getDetailUser (id) {
      this.$store.dispatch("user/getDetailUser", id)
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
    },
    like () {
      this.$http.post('http://localhost:3000/api/post/likes',
      {
        question_id: this.detailPost.id
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
