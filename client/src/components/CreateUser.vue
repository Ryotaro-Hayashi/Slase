<template>
  <div class="create">
    <p>{{ results}}</p>
    <v-app>
      <!-- v-cardコンポーネントでパネルを作成 -->
      <v-card width="400px" class="mx-auto mt-5">
      <!-- パネルのタイトル -->
      <v-card-title>
        <!-- display-1は文字の大きさを設定するvuetifyで設定されているclass -->
        <h1 class="display-1">ログイン</h1>
      </v-card-title>
    </v-card>
    </v-app>
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
