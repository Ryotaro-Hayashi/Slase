<template>
  <div class="home">
    <v-app>

      <v-container>
        <v-row>
          <!-- スマホ以外のときのソートのためのナビゲーション -->
          <v-col sm="3" md="2" lg="5" v-if="loggedIn && !$vuetify.breakpoint.xsOnly">
            <!-- タイムライン -->
            <v-list-item>
              <span class="mx-auto">
                <v-btn :color="color[0]" dark fixed width="150px" @click="getPosts(states[0])" class="mx-auto">
                  <span class="mr-auto">
                    <v-icon>mdi-format-list-bulleted-square</v-icon>タイムライン
                  </span>
                </v-btn>
              </span>
            </v-list-item>

            <!-- 全ての投稿 -->
            <v-list-item>
              <span class="mx-auto">
                <v-btn :color="color[1]" dark fixed width="150px" @click="getPosts(states[1])">
                  <span class="mr-auto">
                    <v-icon>mdi-format-list-bulleted-square</v-icon>全ての投稿
                  </span>
                </v-btn>
              </span>
            </v-list-item>

            <!-- いいねした投稿 -->
            <v-list-item>
              <span class="mx-auto">
                <v-btn :color="color[2]" dark fixed width="150px" @click="getPosts(states[2])">
                  <span class="mr-auto">
                    <v-icon>mdi-format-list-bulleted-square</v-icon>いいねした投稿
                  </span>
                </v-btn>
              </span>
            </v-list-item>

            <v-list-item class="fixed">
              <span class="ml-auto">
                <v-card width="400px" class="mt-10">
                  <v-list-item to="/mypage">
                    <!-- アバター -->
                    <v-list-item-avatar tile fixed>
                      <img :src="loggedInUser.avatar.url">
                    </v-list-item-avatar>

                    <!-- 名前とメアド -->
                    <v-list-item-content>
                      <v-list-item-title class="title">{{ loggedInUser.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ loggedInUser.email }}</v-list-item-subtitle>
                    </v-list-item-content>

                  </v-list-item>

                  <v-divider />

                  <v-list-item>
                    <v-col>
                      <router-link to="/mypage">
                        <span class="follow-num-space title">{{ loggedInUser.questions.length }}</span>
                        <span class="font-wight-light caption">投稿</span>
                      </router-link>
                    </v-col>

                    <v-divider vertical />

                    <!-- フォロー -->
                    <v-col>
                      <router-link to="/following">
                        <span class="follow-num-space title">{{ followingsNum }}</span>
                        <span class="font-wight-light caption">フォロー</span>
                      </router-link>
                    </v-col>

                    <v-divider vertical />

                    <!-- フォロワー -->
                    <v-col>
                      <router-link to="/follower">
                        <span class="follow-num-space title">{{ followersNum }}</span>
                        <span class="font-wight-light caption">フォロワー</span>
                      </router-link>
                    </v-col>
                  </v-list-item>
                </v-card>
              </span>
            </v-list-item>

          </v-col>

          <!-- スマホの時のソートのためのナビゲーション -->
          <v-col cols="12" v-if="loggedIn && $vuetify.breakpoint.xsOnly">
            <v-select v-model="sort" :items="states" single-line @change="getPosts" solo></v-select>
          </v-col>

          <!-- ソートの種類 -->
          <v-col cols="12" sm="loggedIn ? '9' : '12'" md="loggedIn ? '10' : '12'" :lg="loggedIn ? '7' : '12'">
            <v-card width="95%" max-width="600px" class="loggedIn ? mr-auto : mx-auto">
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

              <!-- 投稿一覧表示 -->
              <v-card-text>

                <v-list three-line>
                  <template v-for="post in allPosts">
                    <v-list-item :key="post.id">

                      <!-- アバター -->
                      <v-list-item-avatar tile>
                        <img :src="post.user.avatar.url" alt="画像">
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

                <v-card-actions v-if="!isNotEmpty(allPosts)">
                  {{ message }}
                </v-card-actions>

              </v-card-text>

            </v-card>

          </v-col>

        </v-row>
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
      type: "全ての投稿",
      color: [
        'deep-purple', 'grey', 'grey'
      ],
      message: "まだ投稿がありません。"
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
    },
    // 配列が空でなければ、trueを返す
    isNotEmpty: function () {
      return function (allPosts) {
        // JavaScriptでは条件文で空文字を評価できる
        // 配列の1つ目の要素を評価する
        if (allPosts[0]) {
          return true
        } else {
          return false
        }
      }
    },
    followingsNum () {
      return this.$store.state.user.followings.length
    },
    followersNum () {
      return this.$store.state.user.followers.length
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
      // 色をリセット
      this.color = ["grey", "grey", "grey"]
      // 表示するソート
      this.sort = type

      if (this.sort === 'タイムライン') {
        // 投稿を取得
        this.getFollowingsPosts ()
        // 色を設定
        this.color[0] = "deep-purple"
        // 投稿が空だった時のメッセージを設定
        this.message = "まだ投稿がありません。"
      } else if (this.sort === '全ての投稿') {
        this.getAllPosts ()
        this.color[1] = "deep-purple"
        this.message = ""
      } else {
        this.getLikedPosts ()
        this.color[2] = "deep-purple"
        this.message = "まだいいねした投稿がありません。"
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
.fixed {
  position: fixed;
}
</style>
