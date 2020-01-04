<template>
<div class="home">
  <v-app>
    <!-- レスポンシブなナビゲーションメニューの追加とdrawerで管理 -->
    <v-navigation-drawer app v-model="drawer" clipped>ナビゲーションメニュー</v-navigation-drawer>
    <!-- ナビゲーションバーの領域を確保 -->
    <v-app-bar color="#33CCCC" dark app>
      <!-- ハンバーガーメニュー（引き出し）の追加 -->
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Slase</v-toolbar-title>
        <!-- <v-toolbar></v-toolbar> -->
        <!-- <router-link to="/">Slase logo</router-link>
        <p prepend-icon="mdi-account-question"></p>
        <v-toolbar-title></v-toolbar-title>
        <v-toolbar-items>
        </v-toolbar-items> -->
    </v-app-bar>
    <v-footer color="#33CCCC" dark app>
      <span class="mx-auto">copy right : Ryotaro Hayashi</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      // ナビゲーションメニューの引き出しを管理するプロパティ
      drawer: false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
