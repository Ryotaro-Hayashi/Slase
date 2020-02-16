<template>
<div class="email">
  <v-app>
    <v-card width="600px" class="mx-auto mt-10">
      <v-card-title>
        <p class="mx-auto">メールアドレスを変更</p>
      </v-card-title>
      <v-card-text>
        <v-form>
          <p>現在のメールアドレス：{{ loggedInUserInfo.email }}</p>
          <v-text-field prepend-icon="mdi-email" label="新しいメールアドレス" v-model="email" />
          <v-card-actions class="mt-5">
            <v-btn class="info ml-auto" @click="changeEmail">変更</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'Email',
  data () {
    return {
      email: ''
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
    changeEmail () {
      this.$store.dispatch("email", {
        email: this.email,
        token: this.userToken
      })
    }
  }
}

</script>

<style scoped>

</style>
