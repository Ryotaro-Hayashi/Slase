<template>
<div class="user">
  <v-app>
    <v-card width="800px" class="mx-auto mt-10">
      <ul>
        <p></p>
        <!-- ログイン中のユーザーに投稿がなければ非表示 -->
        <span v-if="myPosts=null">
          <p>まだ投稿がありません</p>
          <router-link to="/post">投稿してみる</router-link>
        </span>
        <!-- 投稿があれば表示 -->
        <span v-if="myPosts=!null">
          <li v-for="myPost in myPosts" :key="myPost.id"><router-link class="title font-weight-bold" to="posting" @click.native="getId(myPost.id)">{{ myPost.title }}</router-link><br>{{ myPost.date }}{{ myPost.time }}<v-divider></v-divider></li>
        </span>
      </ul>
    </v-card>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'MyPage',
  computed: {
    // ログイン中のユーザーの投稿一覧表示
    myPosts () {
      return this.$store.state.myQuestions
    }
  },
  methods: {
    // 詳細表示する投稿情報を更新
    getId (id) {
      this.$store.dispatch("posting", id)
    }
 }

}
</script>

<style lang="css" scoped>
</style>
