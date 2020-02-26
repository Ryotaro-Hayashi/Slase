<template>
<div class="signup">
  <!-- Vuetifyのコンポーネントを書くためのv-app要素 -->
  <v-app>
    <!-- v-cardコンポーネントでパネルを作成 -->
    <!-- mx-autoで中央寄せ、mtでtopとのマージンを指定 -->
    <v-card width="400px" class="mx-auto mt-10">
      <!-- パネルのタイトルエリア -->
      <v-card-title>
        <p class="mx-auto">Slase-logo</p>
      </v-card-title>
      <v-card-title>
        <p class="mx-auto">ユーザー登録</p>
      </v-card-title>
      <!-- パネルのテキストエリア -->
      <v-card-text>
      <!-- フォームを用意 -->
      <v-form>
        <!-- マテリアルデザインアイコンを使うときは、アイコン名の先頭に「mdi-」を付ける -->
        <v-text-field prepend-icon="mdi-account-circle" label="ユーザ名" v-model="name" />
        <v-text-field prepend-icon="mdi-email" label="メールアドレス" v-model="email" />
        <!-- prepend-icon で前に、append-icon で後ろにアイコンを配置-->
        <!-- showPasswordプロパティの真偽で、属性typeがtextとpasswordに切り替わるようにする -->
        <!-- showPasswordプロパティの真偽で、アイコンを変更するようにする -->
        <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" label="パスワード" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="password" />
        <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" label="パスワードを再入力" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="password_confirmation" />
        <!-- ユーザー登録ボタンの配置エリア -->
        <v-card-actions class="mt-5">
          <v-btn class="info ml-auto" v-on:click="register">ユーザー登録</v-btn>
        </v-card-actions>
      </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</div>
</template>

<script>
// import EmailForm from '@/components/EmailForm.vue'

export default {
  name: 'Signup',
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
  methods: {
    // ユーザー登録ボタンで引数にname,....を与えて、storeのsignupミューテーションを呼び出し
    register () {
      this.$store.dispatch("signup", {
        name: this.name,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
