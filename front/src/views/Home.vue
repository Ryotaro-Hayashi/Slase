<template>
  <div class="home">
    <v-app>
      <v-card width="600px" class="mx-auto mt-10">
        <v-card-title>
          <p class="mx-auto">投稿一覧</p>
        </v-card-title>
        <v-card-text>
          <ul>
            <li v-for="question in allQuestions" :key="question.id"><div class="title font-weight-bold">{{ question.title }}</div>by {{ question.user_id }}  {{ question.created_at}}<v-divider></v-divider></li>
            <li v-for="question in allQuestions" :key="question.id">{{ question }}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-app>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  computed: {
    allQuestions () {
      return this.$store.state.questions
    },
    userToken () {
      return this.$store.state.token
    }
  },
  methods: {
    questions () {
      this.$store.dispatch("posts")
    }
  },
  mounted: function() {
    this.questions()
  }
}
</script>

<style lang="css" scoped>

</style>
