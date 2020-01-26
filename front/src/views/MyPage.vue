<template>
<div class="mypage">
  <h1 class="center">Welcome</h1>
  <p>こんにちは{{ userInfo }}さん</p>
</div>
</template>

<script>
export default {
  name: 'MyPage',
  computed: {
    userInfo () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="css" scoped>
</style>
