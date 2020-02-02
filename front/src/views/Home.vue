<template>
  <div class="home">
    <v-app>
      <v-card width="600px" class="mx-auto mt-10">
        <v-card-title>
          <p class="mx-auto">投稿一覧</p>
        </v-card-title>
        <v-card-text>
          <ul>
            <li v-for="question in allQuestions" :key="question.id"><router-link class="title font-weight-bold" to="posting" @click.native="getId(question.id)">{{ question.title }}</router-link><br>by {{ question.user_id }}  {{ question.created_at}}<v-divider></v-divider></li>
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
    }
  },
  methods: {
    questions () {
      this.$store.dispatch("posts")
    },
    getId (id) {
      this.$store.dispatch("myposts", id)
    }
  },
  mounted: function() {
    this.questions()
  }
}
</script>

<style lang="css" scoped>

</style>
