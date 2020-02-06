<template>
  <div class="home">
    <v-app>
      <v-card width="600px" class="mx-auto mt-10">
        <v-card-title>
          <p class="mx-auto">投稿一覧</p>
        </v-card-title>
        <v-card-text>
          <ul>
            <li v-for="question in allQuestions" :key="question.id"><router-link class="title font-weight-bold" to="posting" @click.native="getId(question.id)">{{ question.title }}</router-link><br>投稿者：{{ question.user.name }} 投稿日時：{{ question.date}}{{ question.time}}<v-divider></v-divider></li>
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
    // 全てのユーザーの全ての投稿を表示
    allQuestions () {
      return this.$store.state.questions
    }
  },
  methods: {
    // ステートの投稿一覧を更新
    questions () {
      this.$store.dispatch("posts")
    },
    // 詳細表示する投稿情報を更新
    getId (id) {
      this.$store.dispatch("posting", id)
    }
  },
  // マウント時にステートの投稿一覧を更新
  mounted: function() {
    this.questions()
  }
}
</script>

<style lang="css" scoped>

</style>
