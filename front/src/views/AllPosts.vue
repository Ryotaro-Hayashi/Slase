<template>
  <div class="posts">
    <h1>"allposts"</h1>
    <ul>
      <li v-for="question in allQuestions" :key="question.id">{{ question }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AllPosts',
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
