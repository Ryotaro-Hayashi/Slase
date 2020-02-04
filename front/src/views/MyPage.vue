<template>
<div class="mypage">
  <v-app>
    <v-card width="800px" class="mx-auto mt-10">
      <h1 class="center">マイページ</h1>
      <br>
      <ul>
        <p>こんにちは{{ userInfo.user.name }}さん</p>
        <!-- ログイン中のユーザーに投稿がなければ非表示 -->
        <span v-if="myPosts=null">
          <p>まだ投稿がありません</p>
          <router-link to="/post">投稿してみる</router-link>
        </span>
        <!-- 投稿があれば表示 -->
        <span v-if="myPosts=!null">
          <p>My投稿一覧</p>
          <li v-for="myPost in myPosts" :key="myPost.id"><router-link class="title font-weight-bold" to="posting" @click.native="getId(myPost.id)">{{ myPost.title }}</router-link><br>{{ myPost.created_at}}<v-divider></v-divider></li>
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
    // ログイン中のユーザーの情報を表示
    userInfo () {
      return this.$store.state.user
    },
    // ログイン中のユーザーの投稿一覧表示
    myPosts () {
      return this.$store.state.myQuestions
    }
  },
  methods: {
    // ログイン中のユーザーの投稿一覧を更新
    getMyPosts () {
      this.$store.dispatch("myposts", this.userInfo.user.id)
    },
    // 詳細表示する投稿情報を更新
    getId (id) {
      this.$store.dispatch("posting", id)
    }
 },
 // マウント時にログイン中のユーザーの投稿一覧を更新
 mounted: function () {
   this.getMyPosts()
 }

}
</script>

<style lang="css" scoped>
</style>
