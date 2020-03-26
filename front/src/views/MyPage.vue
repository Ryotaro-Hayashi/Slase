<template>
  <div class="my-page">
    <v-app>

      <v-container>
        <v-row>
          <v-col>
            <v-card width="95%" max-width="600px" class="mx-auto mt-10 mb-10">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="9" sm="10" md="10" lg="10">
                      <v-avatar size="80">
                        <img :src="loggedInUser.avatar.url">
                      </v-avatar>

                    </v-col>

                    <v-col cols="3" sm="2" md="2" lg="2">
                      <v-dialog v-model="dialog" persistent width="800px" class="mx-auto">
                        <template v-slot:activator="{ on }">

                          <!-- 編集ボタン -->
                          <!-- クリックして、ログインユーザーのプロフィールをdataに格納し、ダイアログを表示 -->
                          <v-btn v-on="on" @click="setProfile()">編集</v-btn>

                        </template>

                        <!-- 表示するダイアログ -->
                        <v-card max-width="800px" class="mx-auto">
                          <v-card-title>
                            プロフィールを編集
                          </v-card-title>

                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="6">
                                  <v-avatar>
                                    <img :src="avatarUrl">
                                  </v-avatar>
                                </v-col>

                                <v-col cols="6">
                                  <v-text-field v-model="avatarName" label="画像アップロード" prepend-icon="mdi-file-document" @click="pickFile"/>
                                  <input ref="image" type="file" accept="image/jpeg, image/png" @change="onAvatarChange" style="display: none"/>
                                </v-col>

                                <v-col cols="6">
                                  <v-text-field label="ユーザー名" v-model="name"></v-text-field>
                                </v-col>

                                <v-col cols="6">
                                  <v-text-field label="位置情報" v-model="address"></v-text-field>
                                </v-col>
                              </v-row>

                              <v-row>
                                <v-col cols="12">
                                  <v-textarea label="自己紹介" v-model="introduce"></v-textarea>
                                </v-col>
                              </v-row>

                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="updateProfile">Save</v-btn>
                          </v-card-actions>

                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>

                  <v-row>
                    <!-- ユーザー名 -->
                    <v-col class="display-1 font-weight-bold">{{ loggedInUser.name }}</v-col>
                  </v-row>

                  <v-row>
                    <!-- フォロー -->
                    <v-col :cols="4" sm="2" md="2" lg="2">
                      <router-link to="/following">
                        <span class="follow-num-space title">{{ followingsNum }}</span>
                        <span class="font-wight-light caption">フォロー</span>
                      </router-link>
                    </v-col>
                    <!-- フォロワー -->
                    <v-col :cols="4" sm="3" md="3" lg="3">
                      <router-link to="/follower">
                        <span class="follow-num-space title">{{ followersNum }}</span>
                        <span class="font-wight-light caption">フォロワー</span>
                      </router-link>
                    </v-col>
                  </v-row>

                  <!-- プロフィール説明と位置情報 -->
                  <v-row>
                    <v-col cols="12" v-if="!stringEmpty(loggedInUser.introduce)">{{ loggedInUser.introduce }}</v-col>
                    <v-col cols="12" v-if="!stringEmpty(loggedInUser.address)"><v-icon>mdi-map-marker</v-icon>{{ loggedInUser.address }}</v-col>
                  </v-row>
                </v-container>


                <v-divider></v-divider>

                <v-list three-line>
                  <template v-for="loggedInUserPost in loggedInUser.questions">
                    <v-list-item :key="loggedInUserPost.id">
                      <!-- アバター -->
                      <v-list-item-avatar color="blue" tile>
                        <v-icon large dark>mdi-account-circle</v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <!-- タイトル -->
                        <v-list-item-title>
                          <router-link class="title font-weight-bold" to="/detail/post" @click.native="getDetailPost(loggedInUserPost.id)">{{ loggedInUserPost.title }}</router-link>
                        </v-list-item-title>

                        <v-card-actions>
                          <!-- 投稿者と投稿日時 -->
                          <v-list-item-subtitle>
                            <v-row dense>
                              <v-col cols="12" sm="6" md="6" lg="6">投稿者：{{ loggedInUserPost.user.name }}</v-col>
                              <v-col cols="12" sm="6" md="6" lg="6">投稿日時：{{ loggedInUserPost.date }}</v-col>
                            </v-row>
                            <v-row>
                              <!-- いいねの数を表示 -->
                              <v-col>
                                <v-icon small :color="isLiked(loggedInUserPost.likes) ? 'pink' : ''">mdi-thumb-up</v-icon>
                                {{ Object.keys(loggedInUserPost.likes).length }}
                              </v-col>
                              <!-- コメント数を表示 -->
                              <v-col>
                                <v-icon small :color="isCommented(loggedInUserPost.comments) ? 'pink' : ''">mdi-comment-multiple</v-icon>
                                {{ Object.keys(loggedInUserPost.comments).length }}
                              </v-col>
                            </v-row>
                          </v-list-item-subtitle>
                        </v-card-actions>

                        <v-divider></v-divider>

                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>

                <v-card-actions v-if="arrayEmpty(loggedInUser.questions)">
                  まだ投稿がありません。
                </v-card-actions>

              </v-card-text>
            </v-card>
          </v-col>

          <!-- <v-col></v-col> -->
        </v-row>
      </v-container>


    </v-app>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  data () {
    return {
      dialog: false,
      // プロフィール情報
      name: "",
      introduce: "",
      address: "",
      avatarUrl: '',
      avatarFile: '',
      avatarName: ''
    }
  },
  computed: {
    // ログイン中のユーザーの情報を表示
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
    },
    followingsNum () {
      return this.$store.state.user.followings.length
    },
    followersNum () {
      return this.$store.state.user.followers.length
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
    token () {
      return this.$store.state.auth.token
    },
    //
    stringEmpty: function () {
      return function (object) {
        // 条件式内の真理値は、 "" であればfalse、文字列が入っていればtrue
        if (object) {
          return false
        } else {
          return true
        }
      }
    },
    // 配列が空でなければ、trueを返す
    arrayEmpty: function () {
      return function (myposts) {
        // 条件式内の真理値は、nullであればfalse、オブジェクトが入っていればtrue
        if (myposts[0]) {
          return false
        } else {
          return true
        }
      }
    }
  },
  methods: {
    getLoggedInUser (id) {
      this.$store.dispatch("auth/getLoggedInUser", id)
    },
    // 投稿の詳細を取得
    getDetailPost (id) {
      this.$store.dispatch("post/getDetailPost", id)
    },
    // プロフィールを更新
    updateProfile () {
      this.$store.dispatch("auth/updateProfile",
      {
        avatar: this.avatarFile,
        name: this.name,
        introduce: this.introduce,
        address: this.address,
        token: this.token
      })
      this.dialog = false
    },
    setProfile () {
      // dataにdispatchで更新したログインユーザー情報を格納
      this.name = this.loggedInUser.name
      this.introduce = this.loggedInUser.introduce
      this.address = this.loggedInUser.address
    },
    // 選択された画像ファイルの処理
    pickFile() {
      this.$refs.image.click()
    },
    // 画像の読み取り
    onAvatarChange(e) {
      // filesプロパティは複数ファイルを管理できるように配列になっている
      const files = e.target.files
      this.avatarName = files[0].name
      // FileReaderはファイルの読み取りアクセスを行うオブジェクト
      const fr = new FileReader()
      // ファイルをDataURIとして読み込むメソッドで、img要素のsrc属性に指定すればブラウザに表示できる。
      fr.readAsDataURL(files[0])
      // 読み込み（load）終わったら中身が発火する
      fr.addEventListener("load", () => {
        this.avatarUrl = fr.result
        this.avatarFile = files[0]
      })
    }
 },
 mounted () {
   this.getLoggedInUser(this.loggedInUser.id);
 }

}
</script>

<style lang="css" scoped>
</style>
