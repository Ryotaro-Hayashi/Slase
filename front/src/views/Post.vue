<template>
  <div class="post">
    <v-app>
      <v-card width="95%" max-width="600px" class="mx-auto mt-10 mb-10">
        <!-- 投稿ボタンを押した際にもvalidation -->
        <ValidationObserver v-slot="{ handleSubmit }">
          <!-- タイトル入力フォーム -->
          <v-card-text>
            <!-- validationを付与 -->
            <ValidationProvider v-slot="{ errors }" name="タイトル" rules="required">
              <v-text-field label="タイトル" outlined class="post-font-size" v-model="title" :error-messages="errors[0]" />
            </ValidationProvider>
          </v-card-text>

          <!-- 本文入力フォーム -->
          <v-card-text>
            <ValidationProvider v-slot="{ errors }" name="本文" rules="required">
              <v-textarea label="本文" outlined height="500" class="post-font-size" v-model="body" :error-messages="errors[0]" />
            </ValidationProvider>
          </v-card-text>

          <v-card-text>
            <v-row>
              <!-- 画像アップロードフォーム -->
              <v-col cols="7" sm="5" md="5" lg="5">
                <v-text-field v-model="imageName" label="画像アップロード" prepend-icon="mdi-file-document" @click="pickFile"/>
                <input ref="image" type="file" accept="image/jpeg, image/png" @change="onImageChange" style="display: none"/>
              </v-col>
              <!-- プレビューゾーン -->
              <v-col cols="12" sm="7" md="7" lg="5">
                <v-img :src="imageUrl" />
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <!-- プレビューボタンのためのスペースを用意 -->
            <v-card-actions class="mt-5">
              <!-- プレビューボタン -->
              <v-dialog v-model="dialog" width="600px" class="mx-auto">
                <template v-slot:activator="{ on }">
                  <v-btn class="info ml-auto" v-on="on" @click="setProfile()">プレビュー</v-btn>
                </template>

                <!-- ダイアログで表示する内容 -->
                <v-card>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <!-- アバター -->
                        <v-col cols="8" sm="9" md="9" lg="9">
                          <v-avatar tile>
                            <img :src="loggedInUser.avatar.url">
                          </v-avatar>
                        </v-col>

                        <!-- いいねアイコン -->
                        <v-col cols="2" sm="2" md="2" lg="2">
                          <v-btn icon>
                            <v-icon>mdi-thumb-up</v-icon>
                          </v-btn>
                        </v-col>

                        <!-- 投稿日時 -->
                        <v-col cols="12" sm="12" md="12" lg="12">
                          投稿日時
                        </v-col>
                      </v-row>

                      <!-- タイトル -->
                      <v-row>
                        <v-col class="headline font-weight-bold">
                          {{ title }}
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <!-- 本文 -->
                          <strong style="white-space:pre-wrap; word-wrap:break-word;">
                            {{ body }}
                          </strong>
                        </v-col>

                        <v-col cols="12">
                          <!-- 添付画像 -->
                          <v-img :src="imageUrl"></v-img>
                        </v-col>
                      </v-row>

                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">キャンセル</v-btn>
                    <v-btn color="blue darken-1" text @click="handleSubmit(post)">投稿</v-btn>
                  </v-card-actions>

                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card-text>



      </ValidationObserver>
      </v-card>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'Post',
  data: () => ({
    dialog: false,
    title: '',
    body: '',
    imageUrl: '',
    imageFile: '',
    imageName: '',
  }),
  computed: {
    // トークンを取得
    token () {
      return this.$store.state.auth.token
    },
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
    },
  },
  methods: {
    // 投稿
    post () {
      this.$store.dispatch("post/post", {
        title: this.title,
        body: this.body,
        image: this.imageFile,
        token: this.token
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
/* 投稿時のフォントサイズ */
.post-font-size {
  font-size: 30px;
}
</style>
