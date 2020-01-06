<template>
<div id="app">
  <v-app>
    <!-- レスポンシブなナビゲーションメニューの追加とdrawerで管理 -->
    <!-- <v-navigation-drawer app v-if="drawer" clipped>ナビゲーションメニュー</v-navigation-drawer> -->
    <!-- ナビゲーションバーの領域を確保 -->
    <v-app-bar color="#00CC99" dark app>
      <!-- ナビゲーションメニュー（引き出し）の追加 -->
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Slase</v-toolbar-title>
      <!-- スペースを取る -->
      <v-spacer></v-spacer>
      <v-btn text outlined x-large to="/user">ユーザー登録</v-btn>

      <!-- ドロップダウンメニュー -->
      <!-- <v-toolbar-items>
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn text v-on="on">設定</v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>aaa</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items> -->

    </v-app-bar>
    <!-- 各ページで表示されるコンテンツは、v-contentタグをv-app-barタグの下に配置してrouter-viewで挿入する -->
    <v-content>
      <router-view />
    </v-content>
    <v-footer color="#00CC99" dark app>
      <span class="mx-auto">copy right : Ryotaro Hayashi</span>
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
      themeColor: '#00CC99'
    }
  }
}
</script>

<style>

</style>
