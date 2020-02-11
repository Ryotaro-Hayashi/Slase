<template>
  <div class="post">
    <v-app>
      <v-card width="1200px" class="mx-auto mt-10">
        <h1 class="center">投稿</h1>

        <v-form>
          <v-text-field label="タイトル" outlined class="posting" v-model="title"></v-text-field>
          <v-textarea label="本文" outlined height="500" class="posting" v-model="body"></v-textarea>
          <input type="file" accept="image/jpeg, image/png" @change="onImageChange"/>
          <v-img :src="question_image" />
          <!-- スペースを用意 -->
          <v-card-actions class="mt-5">
            <v-btn class="info ml-auto" v-on:click="question">投稿</v-btn>
          </v-card-actions>
        </v-form>

      </v-card>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'Post',
  data: () => ({
    title: '',
    body: '',
    question_image: ''
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
        token: this.userToken
      })
    },
    getBase64 (file) {
      return new Promise((resolve) => {
        // FileReaderはファイルの読み取りアクセスを行うオブジェクト
        const reader = new FileReader()
        // ファイルをDataURIとして読み込むメソッドで、img要素のsrc属性に指定すればブラウザに表示できる。
        reader.readAsDataURL(file)
        // onloadメソッドは、読み込みが完了した時に発火するメソッド
        // resolveは同期処理の成功時の処理を書き、thenに渡される
        reader.onload = () => resolve(reader.result)
      })
    },
    onImageChange(e) {
      // filesプロパティは複数ファイルを管理できるように配列になっている
      const images = e.target.files
      // ドラッグアンドドロップも有効にするなら || e.dataTransfer.files を追加
      this.getBase64(images[0])
        // imageはresolveで渡されたreader.result
       .then(image => this.question_image = image)
    }
  }
}
</script>

<style scoped>
.posting {
  font-size: 30px;
}
</style>
