<template>
  <div class="post">
    <v-app>
      <v-form>
        <v-text-field label="タイトル" outlined class="posting" v-model="title"></v-text-field>
        <v-textarea label="本文" outlined height="500" class="posting" v-model="body"></v-textarea>
        <input type="file" accept="image/jpeg, image/png" @change="onImageChange"/>
        <!-- プレビューゾーン -->
        <v-img :src="imageUrl" />
        <!-- スペースを用意 -->
        <v-card-actions class="mt-5">
          <v-btn class="info ml-auto" v-on:click="question">投稿</v-btn>
        </v-card-actions>
      </v-form>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'Post',
  data: () => ({
    title: '',
    body: '',
    imageUrl: '',
    imageFile: ''
  }),
  computed: {
    // トークンを取得
    userToken () {
      return this.$store.state.token
    }
  },
  methods: {
    // 投稿
    question () {
      this.$store.dispatch("post", {
        title: this.title,
        body: this.body,
        image: this.imageFile,
        token: this.userToken
      })
    },
    // 画像の読み取り
    onImageChange(e) {
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
    }
  }
}
</script>

<style scoped>
.posting {
  font-size: 30px;
}
</style>
