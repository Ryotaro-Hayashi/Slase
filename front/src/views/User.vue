<template>
<div class="user">
  <v-app>
    <v-card width="800px" class="mx-auto mt-10">
      <ul>
        <li>{{ detailUserInfo.name }}</li>
        <!-- labelで囲った範囲がファイル選択のクリック範囲になる -->
        <label>
          <input type="file" accept="image/jpeg, image/png" @change="onAvatarChange"/>
          <v-avatar>
            <v-img :src="avatarUrl" />
          </v-avatar>
        </label>
        <v-btn @click="setAvatar">保存</v-btn>
        <!-- ログイン中のユーザーに投稿がなければ非表示 -->
        <span v-if="myPosts=null">
          <p>まだ投稿がありません</p>
          <router-link to="/post">投稿してみる</router-link>
        </span>
        <!-- 投稿があれば表示 -->
        <span v-if="myPosts=!null">
          <li v-for="myPost in myPosts" :key="myPost.id"><router-link class="title font-weight-bold" to="posting" @click.native="getId(myPost.id)">{{ myPost.title }}</router-link><br>{{ myPost.date }}{{ myPost.time }}<v-divider></v-divider></li>
        </span>
      </ul>
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
      return this.$store.state.myQuestions
    },
    detailUserInfo () {
      return this.$store.getters.detailUserInfo
    },
    userToken () {
      return this.$store.state.token
    }
  },
  methods: {
    // 詳細表示する投稿情報を更新
    getId (id) {
      this.$store.dispatch("posting", id)
    },
    getBase64 (file) {
        // FileReaderはファイルの読み取りアクセスを行うオブジェクト
        const reader = new FileReader()
        // ファイルをDataURIとして読み込むメソッドで、img要素のsrc属性に指定すればブラウザに表示できる。
        reader.readAsDataURL(file)
        // 読み込み（load）終わったら中身が発火する
        reader.addEventListener("load", () => {
          this.avatarUrl = reader.result
          this.avatarFile = file[0]
        })
    },
    onAvatarChange(e) {
      // filesプロパティは複数ファイルを管理できるように配列になっている
      const images = e.target.files
      // ドラッグアンドドロップも有効にするなら || e.dataTransfer.files を追加
      this.getBase64(images[0])
    },
    setAvatar () {
      this.$store.dispatch("setavatar", {
        avatar: this.avatarUrl,
        token: this.userToken
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
