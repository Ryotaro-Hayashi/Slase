<template>
  <div class="hello">
    <p>{{ results}}</p>
    <p>{{ results[0]}}</p>
    <p>{{ results[0].id }}</p>
    <p>{{ results[0].name }}</p>
    <router-link to="/users">ユーザー登録ページ</router-link>
    <router-link to="/home">Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        results: []
      }
    },
    mounted() {
      this.$axios.get("http://localhost:3000/api/v1/users")
      .then(response => {this.results = response.data})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
