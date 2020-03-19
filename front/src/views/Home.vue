<template>
  <div class="home">
    <v-app>

      <v-card width="600px" class="mx-auto mt-10 mb-10">
        <!-- 表示切り替え -->
        <v-card-title>
          <v-col cols="6">
            <!-- ログイン時のタイトル -->
            <v-select v-model="type" :items="states" prepend-icon="mdi-format-list-bulleted-square" single-line @change="getPosts" v-if="loggedIn"></v-select>
            <!-- ログアウト時のタイトル -->
            <span class="title font-weight-bold" v-if="!loggedIn">
              <v-icon class="icon-space">mdi-format-list-bulleted-square</v-icon>latest
            </span>

          </v-col>
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
                      <v-col>投稿者：<router-link to="/detail/user" @click.native="getDetailUser(post.user.id)">{{ post.user.name }}</router-link></v-col>
                      <v-col>投稿日時：{{ post.date }}</v-col>
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
      allPosts: '',
      // 投稿表示の切り替え
      type: 'フォローユーザーの投稿',
      // 投稿表示の選択肢
      states: [
        'フォローユーザーの投稿', '全ての投稿', 'goodした投稿'
      ],
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
    getPosts () {
      if (this.type === '全ての投稿') {
        this.getAllPosts ()
      } else if (this.type === 'フォローユーザーの投稿') {
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
