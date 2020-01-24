<template>
<div id="app">
  <v-app>
    <!-- レスポンシブなナビゲーションメニューの追加とdrawerで管理 -->
    <v-navigation-drawer app v-if="drawer">
      <v-container>
        <!-- 仕切りを追加 -->
        <v-divider></v-divider>
        <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name" :to="nav_list.link">
          <!-- アイコン -->
          <v-list-item-icon>
            <v-icon>{{ nav_list.icon}}</v-icon>
          </v-list-item-icon>
          <!-- コンテンツ -->
          <v-list-item-content>
            <!-- コンテンツ内の文字 -->
            <v-list-item-title>
              {{nav_list.name}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-container>
    </v-navigation-drawer>

    <!-- ナビゲーションバーの領域を確保 -->
    <v-app-bar color="#FFFFFF" light app>
      <!-- ナビゲーションメニュー（引き出し）の追加 -->
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-items>
        <v-btn text to="/">Slase</v-btn>
      </v-toolbar-items>
      <!-- スペースを取る -->
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn>
          キーワード検索
        </v-btn>
        <v-btn>
          マイページ
        </v-btn>
        <v-btn>
          メッセージ
        </v-btn>
        <v-btn>
          カテゴリ
        </v-btn>
        <v-btn>
          質問する
        </v-btn>
        <v-btn>
          回答する
        </v-btn>
        <!-- ドロップダウンメニューを作成 -->
        <!-- offset-y で縦方向の位置関係を補正 -->
        <v-menu offset-y>
          <!-- on はイベントハンドラ -->
          <template v-slot:activator="{on}">
            <!-- ポップアップを追加したい要素に対しv-on="on"を追加 -->
            <!-- ボタンだと自動的にクリックイベントになる -->
            <!-- v-iconタグでアイコンを設定 -->
            <v-btn text v-on="on">
              <v-icon class="icon-space">mdi-settings</v-icon>設定<v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <!-- ポップアップの内容 -->
          <v-list>
            <v-list-item v-for="option in options" :key="option.name" :to="option.link">
              <v-list-item-icon>
                <v-icon>{{ option.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ option.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn text to="/logout">
          <v-icon class="icon-space">mdi-account-arrow-right</v-icon>ログアウト
        </v-btn>

        <v-btn text to="/login">
          <v-icon class="icon-space">mdi-account-arrow-left</v-icon>ログイン
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- 各ページで表示されるコンテンツは、v-contentタグをv-app-barタグの下に配置してrouter-viewで挿入する -->
    <v-content>
      <router-view />
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
        {name: 'アカウント設定', icon: 'mdi-account', link: '/user/edit'},
        {name: 'プロフィール設定', icon: 'mdi-account-card-details', link: '/profile'}
      ],
      nav_lists: [
        {name: 'アカウント設定', icon: 'mdi-account', link: '/user/edit'},
        {name: 'プロフィール設定', icon: 'mdi-account-card-details', link: '/profile'}
      ]
    }
  }
}
</script>

<style>
.icon-space {
  margin-right: 10px;
}

.center {
  text-align: center;
}

ul {
  list-style: none;
}
</style>
