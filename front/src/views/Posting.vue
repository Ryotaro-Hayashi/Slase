<template>
<div class="posting">
  <v-app>
    <v-card width="800px" class="mx-auto mt-10">
      <ul>
        <h1>{{ Posting.title}}</h1>
        <p>by:{{ Posting.user.name}}</p>
        <p>投稿日；{{ Posting.created_at}}</p>
        <h3>{{ Posting.body }}</h3>
      </ul>
    </v-card>
  </v-app>
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
