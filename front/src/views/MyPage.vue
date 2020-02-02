<template>
<div class="mypage">
  <h1 class="center">Welcome</h1>
  <p>こんにちは{{ userInfo.user.name }}さん</p>
  <br>
  <ul>
    <p>このユーザーの投稿一覧</p>
    <li>{{ myPosts }}</li>
  </ul>

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
