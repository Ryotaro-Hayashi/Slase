<template>
  <div class="post">
    <v-app>
      <v-card width="1200px" class="mx-auto mt-10">

        <v-form>
          <v-text-field label="タイトル" outlined class="posting" v-model="title"></v-text-field>
          <v-textarea label="本文" outlined height="500" class="posting" v-model="body"></v-textarea>
          <v-card-actions class="mt-5">
            <v-btn class="info ml-auto" v-on:click="question">投稿</v-btn>
          </v-card-actions>
        </v-form>

      </v-card>
    </v-app>
  </div>


</template>

<script>

export default {
  name: 'Post',
  data: () => ({
    title: '',
    body: '',
  }),
  computed: {
    userToken () {
      return this.$store.state.token
    }
  },
  methods: {
    question () {
      this.$store.dispatch("post", {
        title: this.title,
        body: this.body,
        token: this.userToken
      })
    }
  }
}
</script>

<style scoped>
.posting {
  font-size: 30px;
}
</style>
