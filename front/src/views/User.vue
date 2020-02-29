<template>
<div class="user">
  <v-app>
    <v-card width="800px" class="mx-auto mt-10 mb-10">
      <v-card-text>
        <v-row>
          <v-col>
            <v-avatar color="blue" tile size="100">
              <v-icon large dark>mdi-account-circle</v-icon>
            </v-avatar>
            <div class="display-1 font-weight-bold">{{ detailUser.name }}</div>
          </v-col>
          <v-col>ここにフォローボタンを表示</v-col>
        </v-row>

        <v-row>
          <v-col><span class="yet">ここにプロフィール説明文を表示</span></v-col>
        </v-row>

        <v-divider></v-divider>

        <v-list three-line>
          <template v-for="myPost in myPosts">
            <v-list-item :key="myPost.id">
              <v-list-item-avatar color="blue" tile>
                <v-icon large dark>mdi-account-circle</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title><router-link class="title font-weight-bold" to="/posting" @click.native="getId(myPost.id)">{{ myPost.title }}</router-link></v-list-item-title>
                <v-list-item-subtitle>
                  <v-row>
                    <v-col>投稿者：{{ myPost.user.name }}</v-col>
                    <v-col>投稿日時：{{ myPost.date }}</v-col>
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
  name: 'MyPage',
  data: () => ({
    avatarUrl: '',
    avatarFile: ''
  }),
  computed: {
    // ログイン中のユーザーの投稿一覧表示
    myPosts () {
      return this.$store.state.post.myQuestions
    },
    detailUser () {
      return this.$store.state.auth.detailUser
    },
    token () {
      return this.$store.state.auth.token
    }
  },
  methods: {
    // 詳細表示する投稿情報を更新
    getId (id) {
      this.$store.dispatch("post/posting", id)
    },
    onAvatarChange(e) {
      // filesプロパティは複数ファイルを管理できるように配列になっている
      const files = e.target.files
      // FileReaderはファイルの読み取りアクセスを行うオブジェクト
      const fr = new FileReader()
      // ファイルをDataURIとして読み込むメソッドで、img要素のsrc属性に指定すればブラウザに表示できる。
      fr.readAsDataURL(files[0])
      // 読み込み（load）終わったら中身が発火する
      fr.addEventListener("load", () => {
        this.imageUrl = fr.result
        this.imageFile = files[0]
      })
    },
    setAvatar () {
      this.$store.dispatch("auth/setavatar", {
        avatarUrl: this.avatarUrl,
        avatar: this.avatarFile,
        token: this.token
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
