<template>
<div class="posting">
  <v-app>
    <v-btn @click="getMyPosts"></v-btn>
    <ul>
      <li v-for="user in allUser" :key="user.id">{{ user }}</li>

      <li>{{ myPosts }}</li>
    </ul>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'Posting',
  computed: {
    // 算出プロパティでstateのuserを呼び出し
    userInfo () {
      return this.$store.state.user
    },
    allUser () {
      return this.$store.state.users
    },
    myPosts () {
      return this.$store.state.myQuestions
    }
  },
  methods: {
    getMyPosts () {
      this.$store.dispatch("myposts", this.userInfo.user.id)
   }
  }

}
</script>

<style lang="css" scoped>
</style>
