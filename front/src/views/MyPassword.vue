<template>
  <div class="my-password">
    <v-app>
      <v-card width="95%" max-width="600px" class="mx-auto mt-10">
        <v-card-title>
          <p class="mx-auto">パスワードを変更</p>
        </v-card-title>
        <v-card-text>
          <v-form>
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
  name: 'MyPassword',
  data () {
    return {
      password: ''
    }
  },
  computed: {
    loggedInUser () {
      return this.$store.state.auth.loggedInUser
    },
    token () {
      return this.$store.state.auth.token
    }
  },
  methods: {
    changePassword () {
      this.$store.dispatch("auth/changePassword", {
        password: this.password,
        token: this.token
      })
    }
  }
}

</script>

<style scoped>

</style>
