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
    getFollowingsPosts () {
      this.$http.get('http://localhost:3000/api/post/followings/' + this.loggedInUser.id)
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
    getPosts () {
      if (this.type === '全ての投稿') {
        this.getAllPosts ()
      } else {
        this.getFollowingsPosts ()
      }
    }
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
  },
  // 更新時に再取得
  // beforeUpdate () {
  //   if (this.loggedIn) {
  //     this.getFollowingsPosts()
  //   }
  //   else {
  //     this.getAllPosts()
  //   }
  // }
}
</script>

<style lang="css" scoped>
</style>
