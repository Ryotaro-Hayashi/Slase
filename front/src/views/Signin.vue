<template>
<div class="signin">
  <!-- Vuetifyのコンポーネントを書くためのv-app要素 -->
  <v-app>
    <v-snackbar v-model="userErrorSnackbar" left top color="error" timeout=2500 class="top-align">
      <v-icon>mdi-alert-circle</v-icon>
      入力内容に誤りがあります
      <v-btn text @click="closeSnackbar">
        Close
      </v-btn>
    </v-snackbar>

    <!-- v-cardコンポーネントでパネルを作成 -->
    <!-- mx-auto mt-5 は、vuetifyクラス -->
    <!-- mx-autoで中央寄せ、mtでtopとのマージンを指定 -->
    <v-card width="400px" class="mx-auto mt-10">
      <ValidationObserver v-slot="{ handleSubmit }">

      <!-- パネルのタイトルエリア -->
      <v-card-title>
        <!-- display-1は文字の大きさを設定するvuetifyで設定されているclass -->
        <p class="mx-auto">Slase-logo</p><br>
      </v-card-title>
      <v-card-title>
        <p class="mx-auto">ログイン</p>
      </v-card-title>
      <!-- パネルのテキストエリア -->
      <v-card-text>
        <!-- フォームを用意 -->
        <v-form>
          <ValidationProvider v-slot="{ errors }" name="これ" rules="required|email">
            <v-text-field prepend-icon="mdi-email" label="メールアドレス" v-model="email" :error-messages="errors[0]" />
          </ValidationProvider>
          <!-- type="password"を入れて、入力内容を隠す -->
          <!-- prepend-icon で前に、append-icon で後ろにアイコンを配置-->
          <!-- showPasswordプロパティの真偽で、属性typeがtextとpasswordに切り替わるようにする -->
          <!-- クリックイベントを追加 -->
          <!-- showPasswordプロパティの真偽で、アイコンを変更するようにする -->
          <ValidationProvider v-slot="{ errors }" name="パスワード" rules="required|min:6">
            <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" label="パスワード" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="password" :error-messages="errors[0]" />
          </ValidationProvider>
          <!-- ユーザー登録ボタンの配置エリア -->
          <v-card-actions class="mt-5">
            <router-link to="/signup">新しくユーザー登録</router-link>
            <!-- vuetifyクラスinfoでボタンの色を変更 -->
            <v-btn class="info ml-auto" @click="handleSubmit(login)">ログイン</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>

    </ValidationObserver>
    </v-card>
  </v-app>
</div>
</template>

<script>

export default {
  name: 'Signin',
  data: () => ({
    // showPasswordプロパティでパスワードの表示・非表示を切り替える
    showPassword: false,
    email: '',
    password: ''
  }),
  computed: {
    userErrorSnackbar () {
      return this.$store.state.auth.userErrorSnackbar
    }
  },
  methods: {
    login () {
      this.$store.dispatch("auth/signin", {
        email: this.email,
        password: this.password
      })
    },
    closeSnackbar () {
      this.$store.commit("auth/changeErrorSnackbar", false)
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
