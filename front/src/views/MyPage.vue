<template>
<div class="mypage">
  <v-app>
    <v-card width="800px" class="mx-auto">
      <h1 class="center">Welcome</h1>
      <p>こんにちは{{ userInfo.user.name }}さん</p>
      <br>
      <ul>
        <span v-if="myPosts=null">
          <p>このユーザーの投稿一覧</p>
          <li>{{ myPosts }}</li>
        </span>
        <span v-if="myPosts=!null">
          <p>まだ投稿がありません</p>
          <router-link to="/post">投稿してみる</router-link>
        </span>
      </ul>
    </v-card>
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
    myPosts () {
      return this.$store.state.myQuestions
    }
  },
  methods: {
    getMyPosts () {
      this.$store.dispatch("myposts", this.userInfo.user.id)
   }
 },
 mounted: function () {
   this.getMyPosts()
 }

}
</script>

<style lang="css" scoped>
</style>
