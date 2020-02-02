<template>
<div class="posting">
  <ul>
    <li>{{ myPosts }}</li>
  </ul>
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
  }

}
</script>

<style lang="css" scoped>
</style>
