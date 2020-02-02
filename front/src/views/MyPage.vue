<template>
<div class="mypage">
  <h1 class="center">Welcome</h1>
  <p>こんにちは{{ userInfo.user.name }}さん</p>
  <br>
  <v-app>
    <v-btn @click="getMyPosts"></v-btn>
    <ul>
      <p>ユーザー一覧</p>
      <li v-for="user in allUser" :key="user.id">{{ user }}</li>

      <p>このユーザーの投稿一覧</p>
      <li>{{ myPosts }}</li>
    </ul>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'MyPage',
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
