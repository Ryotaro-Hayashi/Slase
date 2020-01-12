<template>
<div class="users">
  <h1 class="center">ユーザー一覧</h1>
  <ul>
    <li v-for="result in results" :key="result.id" class="center">No.{{ result.id }} {{result.name }}</li>
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
  mounted() {
    this.$axios.get("http://localhost:3000/api/v1/users")
      .then(response => {
        this.results = response.data
      })
  }
}
</script>

<style lang="css" scoped>
</style>
