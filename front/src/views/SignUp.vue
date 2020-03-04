<template>
<div class="sign-up">

  <v-app>
    <!-- 登録ボタンを押した後エラーを表示するスナックバー -->
    <v-snackbar v-model="userErrorSnackbar" left top color="error" timeout=2500 class="top-align">
      <v-icon>mdi-alert-circle</v-icon>
      このメールアドレスは既に登録されています
      <v-btn text @click="closeSnackbar">
        Close
      </v-btn>
    </v-snackbar>

    <v-card width="400px" class="mx-auto mt-10">

      <ValidationObserver v-slot="{ invalid }">
        <!-- ロゴ -->
        <v-card-title>
          <p class="mx-auto">Slase-logo</p>
        </v-card-title>
        <!-- タイトル -->
        <v-card-title>
          <p class="mx-auto">ユーザー登録</p>
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- validationありのユーザー名入力フォーム -->
            <ValidationProvider v-slot="{ errors }" name="ユーザー名" rules="required">
              <v-text-field prepend-icon="mdi-account-circle" label="ユーザ名" v-model="name" :error-messages="errors[0]" />
            </ValidationProvider>

            <!-- メアド入力フォーム -->
            <ValidationProvider v-slot="{ errors }" name="これ" rules="required|email">
              <v-text-field prepend-icon="mdi-email" label="メールアドレス" v-model="email" :error-messages="errors[0]" />
            </ValidationProvider>

            <!-- パスワード入力フォーム -->
            <ValidationProvider v-slot="{ errors }" name="パスワード" rules="required|min:6">
              <!-- prepend-icon で前に、append-icon で後ろにアイコンを配置-->
              <!-- showPasswordプロパティの真偽で、属性typeがtextとpasswordに切り替わってアイコンを変更-->
              <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" label="パスワード" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="password" :error-messages="errors[0]"  />
            </ValidationProvider>

            <!-- 確認用パスワード入力フォーム -->
            <ValidationProvider v-slot="{ errors }" name="再入力したパスワード" rules="required|confirmed:パスワード">
              <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" label="パスワードを再入力" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="password_confirmation" :error-messages="errors[0]" />
            </ValidationProvider>

            <!-- ユーザー登録ボタンの配置エリア -->
            <v-card-actions class="mt-5">
              <v-btn class="info ml-auto" v-on:click="signUp" :disabled="invalid">ユーザー登録</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </ValidationObserver>

    </v-card>
  </v-app>

</div>
</template>

<script>
// import EmailForm from '@/components/EmailForm.vue'

export default {
  name: 'SignUp',
  // components: {
  //   EmailForm
  // },
  data: () => ({
    // showPasswordプロパティでパスワードの表示・非表示を切り替える
    showPassword: false,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }),
  computed: {
    userErrorSnackbar () {
      return this.$store.state.auth.errorSnackbar
    }
  },
  methods: {
    signUp () {
      this.$store.dispatch("auth/signUp", {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
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
