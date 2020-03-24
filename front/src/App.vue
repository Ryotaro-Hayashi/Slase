<template>
<div id="app">
  <v-app>
    <!-- レスポンシブなナビゲーションメニューの追加とdrawerで管理 -->
    <v-navigation-drawer app v-model="drawer" left temporary fixed>
      <v-list>
        <v-list-item to="/mypage">
          <!-- アバター -->
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-list-item-avatar>

          <!-- 名前とメアド -->
          <v-list-item-content>
            <v-list-item-title class="title">{{ loggedInUser.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ loggedInUser.email }}</v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>

        <v-list-item>
          <v-row>
            <!-- フォロー -->
            <v-col>
              <router-link to="/following">
                <span class="follow-num-space">{{ followingsNum }}</span>
                <span class="font-wight-light caption">フォロー</span>
              </router-link>
            </v-col>
            <!-- フォロワー -->
            <v-col>
              <router-link to="/follower">
                <span class="follow-num-space">{{ followersNum }}</span>
                <span class="font-wight-light caption">フォロワー</span>
              </router-link>
            </v-col>
          </v-row>
        </v-list-item>

      </v-list>

      <v-divider></v-divider>

      <!-- dataオプションからリストを作成する方法 -->
      <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name" :to="nav_list.link">

        <v-list-item-icon>
          <v-icon>{{ nav_list.icon}}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>

          <v-list-item-title>
            {{nav_list.name}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- ドロップダウンメニューを作成 -->
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <!-- ポップアップを追加したい要素に対しv-on="on"を追加 -->
          <v-list-item v-on="on">
            <!-- アイコン -->
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                アカウント設定<v-icon>mdi-menu-down</v-icon>
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </template>

        <!-- ポップアップの内容 -->
        <v-list>
          <v-list-item v-for="option in options" :key="option.name" :to="option.link">
            <!-- アイコン -->
            <v-list-item-icon>
              <v-icon>{{ option.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ option.name }}</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-menu>


        <!-- ログアウト時に再確認するためのダイアログ -->
        <v-dialog v-model="dialog" width="300px" class="mx-auto">
          <template v-slot:activator="{ on }">
            <!-- ボタンだとデフォルトでクリックイベントが設定される -->
            <!-- クリックするとダイアログを表示 -->
            <v-card-actions>
              <v-btn color="deep-purple" dark v-on="on" bottom absolute x-large width="90%">
                <v-icon class="icon-space">mdi-account-arrow-right</v-icon>ログアウト
              </v-btn>
            </v-card-actions>
          </template>


          <!-- 表示するダイアログ -->
          <v-card width="300px">
            <!-- タイトル -->
            <v-card-title>
              <span class="mx-auto font-weight-bold title">ログアウトしますか？</span>
            </v-card-title>

            <v-card-actions>
              <v-row justify="space-between">

                <v-col class="center">
                  <v-btn @click="signOut" color="primary">ログアウト</v-btn>
                </v-col>

                <v-col class="center">
                  <v-btn @click="dialog = false">キャンセル</v-btn>
                </v-col>

              </v-row>
            </v-card-actions>

          </v-card>

        </v-dialog>


    </v-navigation-drawer>

    <!-- ナビゲーションバーの領域を確保 -->
    <v-app-bar color="#FFFFFF" light app>
      <!-- ナビゲーションメニュー（引き出し）の追加 -->
      <v-app-bar-nav-icon @click="drawer=!drawer" v-if="loggedIn" />
      <!-- アイコン -->
      <v-toolbar-items>
        <v-btn text to="/">Slase</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <!-- <v-btn>
          <v-icon class="icon-space">mdi-feature-search</v-icon>キーワード検索
        </v-btn>

        <v-btn>
          <v-icon class="icon-space">mdi-email</v-icon>メッセージ
        </v-btn> -->

        <!-- ログイン -->
        <v-btn text to="/signin" v-show="!loggedIn">
          <v-icon class="icon-space">mdi-account-arrow-left</v-icon>ログイン
        </v-btn>

      </v-toolbar-items>
    </v-app-bar>

    <!-- 各ページで表示されるコンテンツは、v-contentの中にrouter-viewで挿入する -->
    <v-content>

      <!-- ログイン成功時に表示するスナックバー -->
      <v-snackbar v-model="userSuccessSnackbar" left top color="success" timeout=2500 class="top-align">
        <v-icon>mdi-account</v-icon>こんにちは {{ loggedInUser.name }}さん
        <v-btn text @click="closeSnackbar">
          Close
        </v-btn>
      </v-snackbar>

      <!-- 投稿成功時に表示するスナックバー -->
      <v-snackbar v-model="postSuccessSnackbar" left top color="success" timeout=2500 class="top-align">
        <v-icon>mdi-post</v-icon>投稿完了
        <v-btn text @click="closeSnackbar">
          Close
        </v-btn>
      </v-snackbar>

      <!-- 投稿作成ボタンを作成 -->
      <v-fab-transition>
        <v-btn color="pink" dark bottom right fab fixed to="/post">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>

      <router-view/>

    </v-content>

    <!-- フッター -->
    <v-footer color="#EEEEEE" light app>
      <span class="mx-auto">© 2020 Ryotaro Hayashi</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // ナビゲーションメニューの引き出しを管理するプロパティ
      drawer: null,
      options: [
        {name: 'メールアドレス', icon: 'mdi-email', link: '/mypage/email'},
        {name: 'パスワード', icon: 'mdi-lock-reset', link: '/mypage/password'}
      ],
      // dataオプションからリストを作成する方法
      nav_lists: [
        {name: 'マイページ', icon: 'mdi-account-box', link: '/mypage'},
        {name: 'Slaseについて', icon: 'mdi-help-box', link: '/mypage'}
      ],

      // 真偽でダイアログの表示を切り替える
      dialog: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.loggedIn
    },
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
    },
    userSuccessSnackbar () {
      return this.$store.state.auth.successSnackbar
    },
    postSuccessSnackbar () {
      return this.$store.state.post.successSnackbar
    },
    followingsNum () {
      return this.$store.state.user.followings.length
    },
    followersNum () {
      return this.$store.state.user.followers.length
    }
  },
  methods: {
    signOut () {
      this.dialog = false
      this.drawer = false
      this.$store.dispatch("auth/signOut")
      this.$router.push("/")
      this.reload()
    },
    closeSnackbar () {
      this.$store.commit("auth/changeSuccessSnackbar", false)
    },
    // リロードする関数
    reload () {
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    }
  }
}
</script>

<style>
/* アイコンとその次の文字との間に入れる空間のためのCSS */
.icon-space {
  margin-right: 10px;
}

/* ダイアログでボタンの位置を中央寄せするためのCSS */
.center {
  text-align: center;
}

/* router-linkの下線を無くすためのCSS */
ul {
  list-style: none;
}

/* router-linkの下線を無くすためのCSS */
a {
    text-decoration: none;
}

/* スナックバーの表示位置を調整するためのCSS */
.top-align {
  margin-top: 70px
}

/* 未導入の機能エリアを塗るためのCSS */
.yet {
  background-color: silver;
}

/* フォロー数とその次の文字との間に入れる空間のためのCSS */
.follow-num-space {
  margin-right: 5px;
}

</style>
