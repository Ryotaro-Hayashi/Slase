<template>
  <div class="home">
    <v-app>

      <v-container>
        <v-row>
          <!-- スマホ以外のときのソートのためのナビゲーション -->
          <v-col cols="0" sm="3" md="2" lg="2" v-if="loggedIn && !$vuetify.breakpoint.xsOnly">
            <!-- タイムライン -->
            <v-list-item>
              <v-fab-transition>
                <v-btn color="deep-purple" dark fixed width="170px" @click="getPosts(states[0])">
                  <span class="mr-auto">
                    <v-icon>mdi-format-list-bulleted-square</v-icon>タイムライン
                  </span>
                </v-btn>
              </v-fab-transition>
            </v-list-item>

            <!-- 全ての投稿 -->
            <v-list-item>
              <v-fab-transition>
                <v-btn color="deep-purple" dark fixed width="170px" @click="getPosts(states[1])">
                  <span class="mr-auto">
                    <v-icon>mdi-format-list-bulleted-square</v-icon>全ての投稿
                  </span>
                </v-btn>
              </v-fab-transition>
            </v-list-item>

            <!-- いいねした投稿 -->
            <v-list-item>
              <v-fab-transition>
                <v-btn color="deep-purple" dark fixed width="170px" @click="getPosts(states[2])">
                  <span class="mr-auto">
                    <v-icon>mdi-format-list-bulleted-square</v-icon>いいねした投稿
                  </span>
                </v-btn>
              </v-fab-transition>
            </v-list-item>
          </v-col>

          <v-col cols="12" sm="9" md="10" lg="8">
            <v-card width="95%" max-width="600px" class="mx-auto">
              <!-- 表示切り替え -->
              <v-card-title>
                <v-row align=center>

                  <!-- ソートの種類のアイコン -->
                  <v-col cols="2" sm="1" md="1" lg="1">
                    <v-icon large>mdi-format-list-bulleted-square</v-icon>
                  </v-col>

                  <!-- ソートの種類 -->
                  <v-col cols="10" sm="6" md="6" lg="6">
                    <span class="title font-weight-bold" v-if="loggedIn">{{ sort }}</span>
                    <span class="title font-weight-bold" v-if="!loggedIn">{{ type }}</span>
                  </v-col>
                </v-row>
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

                        <v-card-actions>
                          <!-- 投稿者と投稿日時 -->
                          <v-list-item-subtitle>
                            <v-row dense>
                              <v-col cols="12" sm="6" md="6" lg="6">投稿者：<router-link to="/detail/user" @click.native="getDetailUser(post.user.id)">{{ post.user.name }}</router-link></v-col>
                              <v-col cols="12" sm="6" md="6" lg="6">投稿日時：{{ post.date }}</v-col>
                            </v-row>
                            <v-row>
                              <!-- いいねの数を表示 -->
                              <v-col>
                                <v-icon small :color="isLiked(post.likes) ? 'pink' : ''">mdi-thumb-up</v-icon>
                                {{ Object.keys(post.likes).length }}
                              </v-col>
                              <!-- コメント数を表示 -->
                              <v-col>
                                <v-icon small :color="isCommented(post.comments) ? 'pink' : ''">mdi-comment-multiple</v-icon>
                                {{ Object.keys(post.comments).length }}
                              </v-col>
                            </v-row>
                          </v-list-item-subtitle>
                        </v-card-actions>

                        <v-divider></v-divider>

                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card-text>

            </v-card>
          </v-col>

        </v-row>

        <v-col cols="0" sm="0" md="0" lg="2" v-if="loggedIn && !$vuetify.breakpoint.xsOnly"></v-col>
      </v-container>

    </v-app>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      allPosts: '',
      // 投稿表示の選択肢
      states: [
        'タイムライン', '全ての投稿', 'いいねした投稿'
      ],
      sort: "タイムライン",
      type: "全ての投稿"
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.loggedIn
    },
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
    },
    // いいねしてれば、trueを返す
    isLiked: function () {
      return function (likes) {
        for (var like of likes) {
          if (like.user_id === this.loggedInUser.id) {
            return true
          }
        }
      }
    },
    // コメントしてれば、trueを返す
    isCommented: function () {
      return function (comments) {
        for (var comment of comments) {
          if (comment.user.id === this.loggedInUser.id) {
            return true
          }
        }
      }
    }
  },
  methods: {
    // 投稿一覧を取得
    getAllPosts () {
      this.$http.get(process.env.VUE_APP_API_BASE_URL + '/api/post/questions')
      .then(response => {
        if (response.status === 200) {
          this.allPosts = response.data
        }
      })
    },
    // フォローしているユーザーの投稿一覧を取得
    getFollowingsPosts () {
      this.$http.get(process.env.VUE_APP_API_BASE_URL + '/api/post/followings/' + this.loggedInUser.id)
      .then(response => {
        if (response.status === 200) {
          this.allPosts = response.data
        }
      })
    },
    // いいねしている投稿一覧を取得
    getLikedPosts () {
      this.$http.get(process.env.VUE_APP_API_BASE_URL + '/api/post/liked/' + this.loggedInUser.id)
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
    // ユーザーの詳細を取得
    getDetailUser (id) {
      this.$store.dispatch("user/getDetailUser", id)
    },
    // 投稿一覧のソート
    getPosts (type) {
      this.sort = type
      if (this.sort === '全ての投稿') {
        this.getAllPosts ()
      } else if (this.sort === 'フォローユーザーの投稿') {
        this.getFollowingsPosts ()
      } else {
        this.getLikedPosts ()
      }
    },
  },
  // ログイン中はフォローしているユーザーの投稿を取得
  // ログアウト中は投稿一覧を取得
  mounted () {
    if (this.loggedIn) {
      this.getFollowingsPosts()
    }
    else {
      this.getAllPosts()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
