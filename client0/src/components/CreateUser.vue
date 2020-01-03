<template>
  <div class="create">
    <p>{{ results}}</p>
  </div>
</template>

<script>
export default {
  name: 'CreateUser',
  data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        results: []
      }
    },
    mounted() {
      axios.get("http://localhost:3000/api/v1/users")
      .then(response => {this.results = response.data})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
