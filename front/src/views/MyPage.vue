<template>
<div class="mypage">
  <h1 class="center">Welcome</h1>
  <p>こんにちは{{ userInfo.user.name }}さん</p>
  <br>
  <ul>
    <li v-for="user in allUser" :key="user.id">{{ user }}</li>
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
    allUser () {
      return this.$store.state.users
    }
  },
  methods: {
    
  }
}
</script>

<style lang="css" scoped>
</style>
