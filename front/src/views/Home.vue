<template>
  <div class="home">
    <h1>"allposts"</h1>
    <ul>
      <li v-for="question in allQuestions" :key="question.id">{{ question.title }}<br>{{ question.created_at}}<br><br></li>
      <li v-for="question in allQuestions" :key="question.id">{{ question }}</li>
    </ul>
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
