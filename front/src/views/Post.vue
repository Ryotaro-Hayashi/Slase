<template>
  <div class="post">
    <v-app>
      <v-card class="mx-auto mt-10 mb-10" width="1200px">
        <v-card-text>
          <v-text-field label="タイトル" outlined class="posting" v-model="title"></v-text-field>
        </v-card-text>

        <v-card-text>
          <v-textarea label="本文" outlined height="500" class="posting" v-model="body"></v-textarea>
        </v-card-text>

        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field v-model="imageName" label="画像アップロード" prepend-icon="mdi-file-document" @click="pickFile"/>
              <input ref="image" type="file" accept="image/jpeg, image/png" @change="onImageChange" style="display: none"/>
            </v-col>
            <v-col>
              <!-- プレビューゾーン -->
              <v-img :src="imageUrl" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text>
          <!-- スペースを用意 -->
          <v-card-actions class="mt-5">
            <v-btn class="info ml-auto" v-on:click="question">投稿</v-btn>
          </v-card-actions>
        </v-card-text>
        
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
    imageUrl: '',
    imageFile: '',
    imageName: ''
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
    // 選択された画像ファイルの処理
    pickFile() {
      this.$refs.image.click()
    },
    // 画像の読み取り
    onImageChange(e) {
      // filesプロパティは複数ファイルを管理できるように配列になっている
      const files = e.target.files
      this.imageName = files[0].name
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
