<template>
<div class="password">
  <v-app>
    <v-card width="600px" class="mx-auto mt-10">
      <v-card-title>
        <p class="mx-auto">パスワードを変更</p>
      </v-card-title>
      <v-card-text>
        <v-form>
          <p>現在のメールアドレス：{{ loggedInUserInfo.password }}</p>
          <v-text-field prepend-icon="mdi-lock" label="新しいパスワード" v-model="password" />
          <v-card-actions class="mt-5">
            <v-btn class="info ml-auto" @click="changePassword">変更</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'Password',
  data () {
    return {
      password: ''
    }
  },
  computed: {
    loggedInUserInfo () {
      return this.$store.getters.loggedInUserInfo.user
    },
    userToken () {
      return this.$store.state.token
    }
  },
  methods: {
    changePassword () {
      this.$store.dispatch("password", {
        password: this.password,
        token: this.userToken
      })
    }
  }
}

</script>

<style scoped>

</style>
