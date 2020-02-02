<template>
<div class="posting">
  <ul>
    <li>{{ Posting }}</li>
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
    Posting () {
      return this.$store.state.question
    }
  }

}
</script>

<style lang="css" scoped>
</style>
