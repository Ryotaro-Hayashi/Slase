<template>
<div class="posting">
  <v-app>
    <v-card width="800px" class="mx-auto mt-10">
      <v-card-title>
        <v-avatar color="blue" tile>
          <v-icon large dark>mdi-account-circle</v-icon>
        </v-avatar>
        <span class="title font-weight-light">&nbsp;{{ Posting.user.name }}</span>
      </v-card-title>

      <v-card-title><span class="title font-weight-bold">{{ Posting.title }}</span></v-card-title>


      <v-card-text class="headline font-weight-bold">
      {{ Posting.title}}
      <p>投稿日時:{{ Posting.date }}{{ Posting.time }}</p>
      <h3>{{ Posting.body }}</h3>
      </v-card-text>

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
