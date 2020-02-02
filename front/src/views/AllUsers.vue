<template>
<div class="users">
  <h1 class="center">ユーザー一覧</h1>
  <ul>
<li v-for="user in allUser" :key="user.id">{{ user }}</li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'AllUsers',
  data() {
    return {
      results: []
    }
  },
  computed: {
    allUser () {
      return this.$store.state.users
    }
  }

}
</script>

<style lang="css" scoped>
</style>
