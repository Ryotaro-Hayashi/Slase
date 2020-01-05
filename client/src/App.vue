<template>
  <div id="app">
    <v-app>
      <!-- レスポンシブなナビゲーションメニューの追加とdrawerで管理 -->
      <v-navigation-drawer app v-model="drawer" clipped>ナビゲーションメニュー</v-navigation-drawer>
      <!-- ナビゲーションバーの領域を確保 -->
      <v-app-bar color="#33CCCC" dark app>
        <!-- ハンバーガーメニュー（引き出し）の追加 -->
        <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Slase</v-toolbar-title>
        <!-- スペースを取る -->
        <v-spacer></v-spacer>
        <v-btn text outlined x-large>ユーザー登録</v-btn>
          <!-- <v-toolbar></v-toolbar> -->
          <!-- <router-link to="/">Slase logo</router-link>
          <p prepend-icon="mdi-account-question"></p>
          <v-toolbar-title></v-toolbar-title>
          <v-toolbar-items>
          </v-toolbar-items> -->
          <v-toolbar-items>
            <v-btn text>設定</v-btn>
          </v-toolbar-items>
      </v-app-bar>
      <v-footer color="#33CCCC" dark app>
        <span class="mx-auto">copy right : Ryotaro Hayashi</span>
      </v-footer>
    </v-app>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // ナビゲーションメニューの引き出しを管理するプロパティ
      drawer: null
    }
  }
}
</script>

<style>

</style>
