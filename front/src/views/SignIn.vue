<template>
  <div class="sign-in">
    <v-app>
      <!-- ログインボタンを押した後エラーがある際のスナックバー -->
      <v-snackbar v-model="userErrorSnackbar" left top color="error" timeout=2500 class="top-align">
        <v-icon>mdi-alert-circle</v-icon>
        入力内容に誤りがあります
        <v-btn text @click="closeSnackbar">
          Close
        </v-btn>
      </v-snackbar>

      <v-card width="600px" class="mx-auto mt-10">

        <ValidationObserver v-slot="{ handleSubmit }">
          <!-- ロゴ -->
          <v-card-title>
            <p class="mx-auto">Slase-logo</p><br>
          </v-card-title>
          <!-- タイトル -->
          <v-card-title>
            <p class="mx-auto">ログイン</p>
          </v-card-title>

          <v-card-text>
            <!-- フォームを用意 -->
            <v-form>
              <!-- validationありのメアド入力フォーム -->
              <ValidationProvider v-slot="{ errors }" name="これ" rules="required|email">
                <v-text-field prepend-icon="mdi-email" label="メールアドレス" v-model="email" :error-messages="errors[0]" />
              </ValidationProvider>

              <!-- パスワード入力フォーム -->
              <ValidationProvider v-slot="{ errors }" name="パスワード" rules="required|min:6">
                <!-- prepend-icon で前に、append-icon で後ろにアイコンを配置-->
                <!-- showPasswordプロパティの真偽で、属性typeがtextとpasswordに切り替わってアイコンを変更 -->
                <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" label="パスワード" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="password" :error-messages="errors[0]" />
              </ValidationProvider>

              <!-- ログインボタンとユーザー登録リンク -->
              <v-card-actions class="mt-5">
                <router-link to="/signup">新しくユーザー登録</router-link>
                <!-- ログインボタン -->
                <v-btn class="info ml-auto" @click="handleSubmit(signIn)">ログイン</v-btn>
              </v-card-actions>

              <v-card-actions>
                <!-- ゲストログインボタン-->
                <v-btn class="info ml-auto" @click="guestSignIn">ゲストログイン</v-btn>
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
  name: 'SignIn',
  data: () => ({
    // showPasswordプロパティでパスワードの表示・非表示を切り替える
    showPassword: false,
    email: '',
    password: ''
  }),
  computed: {
    userErrorSnackbar () {
      return this.$store.state.auth.errorSnackbar
    }
  },
  methods: {
    signIn () {
      this.$store.dispatch("auth/signIn", {
        email: this.email,
        password: this.password
      })
    },
    guestSignIn () {
      this.$store.dispatch("auth/signIn", {
        email: 'guest@guest.com',
        password: 'guestpass'
      })
    },
    closeSnackbar () {
      this.$store.commit("auth/changeErrorSnackbar", false)
    }
  }
}
</script>

<style scoped>
</style>
