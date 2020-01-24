<template>
  <!-- フォームを用意 -->
  <v-form>
    <!-- iライブラリをインストールしているので、mdiを使える -->
    <!-- マテリアルデザインアイコンを使うときは、アイコン名の先頭に「mdi-」を付ける -->
    <v-text-field prepend-icon="mdi-account-circle" label="ユーザ名" v-model="data.name" />
    <v-text-field prepend-icon="mdi-email" label="メールアドレス" v-model="data.email" />
    <!-- type="password"を入れて、入力内容を隠す -->
    <!-- prepend-icon で前に、append-icon で後ろにアイコンを配置-->
    <!-- showPasswordプロパティの真偽で、属性typeがtextとpasswordに切り替わるようにする -->
    <!-- クリックイベントを追加 -->
    <!-- showPasswordプロパティの真偽で、アイコンを変更するようにする -->
    <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" label="パスワード" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="data.password" />
    <!-- ユーザー登録ボタンの配置エリア -->
    <v-card-actions class="mt-5">
      <!-- vuetifyクラスでボタンの色を変更 -->
      <v-btn class="info ml-auto" v-on:click="register">ユーザー登録</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    // showPasswordプロパティでパスワードの表示・非表示を切り替える
    showPassword: false,
    data: {
      name: '',
      email: '',
      password: ''
    },
    Tokens: {}
  })
}
</script>

<style lang="scss" scoped>

</style>
