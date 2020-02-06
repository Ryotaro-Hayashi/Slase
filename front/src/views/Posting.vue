<template>
<div class="posting">
  <v-app>
    <v-card width="800px" class="mx-auto mt-10">
      <ul>
        <h1>{{ Posting.title}}</h1>
        <p>投稿者:{{ Posting.user.name }}</p>
        <p>投稿日時:{{ Posting.date }}{{ Posting.time }}</p>
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
    // 投稿の詳細表示
    Posting () {
      return this.$store.state.question
    }
  }

}
</script>

<style lang="css" scoped>
</style>
