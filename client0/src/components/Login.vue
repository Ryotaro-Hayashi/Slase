<template>
<div class="login">
  <!-- Vuetifyのコンポーネントを書くためのv-app要素 -->
  <v-app>
    <!-- v-cardコンポーネントでパネルを作成 -->
    <!-- mx-auto mt-5 は、vuetifyクラス -->
    <!-- mx-autoで中央寄せ、mtでtopとのマージンを指定 -->
    <v-card width="400px" class="mx-auto mt-10">
      <!-- パネルのタイトルエリア -->
      <v-card-title>
        <!-- display-1は文字の大きさを設定するvuetifyで設定されているclass -->
        <p class="mx-auto">Slase-logo</p>
      </v-card-title>
      <v-card-title>
        <p class="mx-auto">ログイン</p>
      </v-card-title>
      <!-- パネルのテキストエリア -->
      <v-card-text>
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
            <router-link to="/user">新しくユーザー登録</router-link>
            <!-- vuetifyクラスでボタンの色を変更 -->
            <v-btn class="info ml-auto" v-on:click="register">ログイン</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</div>
</template>

<script>

export default {
  name: 'Login',
  data: () => ({
    // showPasswordプロパティでパスワードの表示・非表示を切り替える
    showPassword: false,
    data: {
      name: '',
      email: '',
      password: ''
    }
  }),
  // mounted() {
  //   this.$axios.post('http://localhost:3000/api/v1/users', data)
  // },
  methods: {
    register () {
      this.$axios.post('http://localhost:3000/api/v1/users', this.data)
      // リダイレクト
      .then(document.location = "/users")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
}
</style>
