<template>
  <div class="home">
    <v-app>
      <v-card width="600px" class="mx-auto mt-10 mb-10">
        <v-card-title>
          <p class="mx-auto">投稿一覧</p>
        </v-card-title>
        <v-card-text>

            <v-list three-line>
              <template v-for="question in allQuestions">
                <v-list-item :key="question.id">
                <!-- tileで枠線を視覚にする -->
                  <v-list-item-avatar color="blue" tile>
                    <v-icon dark>mdi-account-circle</v-icon>
                  </v-list-item-avatar>

                <!-- <v-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                </v-avatar> -->

                <v-list-item-content>
                  <v-list-item-title><router-link class="title font-weight-bold" to="/posting" @click.native="getId(question.id)">{{ question.title }}</router-link></v-list-item-title>
                  <v-list-item-subtitle>投稿者：<router-link to="/user" @click.native="getUser(question.user)">{{ question.user.name }}</router-link>投稿日時：{{ question.date }}</v-list-item-subtitle>
                  <v-divider></v-divider>
                </v-list-item-content>
              </v-list-item>
              </template>
            </v-list>
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
    },
    getUser (user) {
      this.$store.dispatch("myposts", user.id)
      this.$store.commit("detailUser", user)
    }
  },
  // マウント時にステートの投稿一覧を更新
  mounted: function() {
    this.questions();
  }
}
</script>

<style lang="css" scoped>
.right-align {
  margin-left: 60px;
}
</style>
