<template>
<div class="posting">
  <v-app>
    <v-card width="800px" class="mx-auto mt-10">
      <v-card-title>
          <v-col :cols="1">
        <v-avatar color="blue" tile>
          <v-icon large dark>mdi-account-circle</v-icon>
        </v-avatar>
      </v-col>
      <v-col :cols="6">
        <span class="title font-weight-light">{{ Posting.user.name }}</span>
      </v-col>
      <v-col :cols="5">
        <v-card-subtitle>{{ Posting.date }}{{ Posting.time }}に投稿</v-card-subtitle>
      </v-col>
      </v-card-title>

      <v-card-title><span class="headline font-weight-bold">{{ Posting.title }}</span></v-card-title>


      <v-card-text class="font-weight-bold">
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
