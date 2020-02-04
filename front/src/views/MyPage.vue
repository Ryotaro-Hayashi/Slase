<template>
<div class="mypage">
  <v-app>
    <v-card width="800px" class="mx-auto">
      <h1 class="center">Welcome</h1>
      <br>
      <ul>
        <p>こんにちは{{ userInfo.user.name }}さん</p>
        <span v-if="myPosts=!null">
          <p>このユーザーの投稿一覧</p>
          <li v-for="myPost in myPosts" :key="myPost.id"><router-link class="title font-weight-bold" to="posting" @click.native="getId(myPost.id)">{{ myPost.title }}</router-link><br>{{ myPost.created_at}}<v-divider></v-divider></li>
        </span>
        <span v-if="myPosts=null">
          <p>まだ投稿がありません</p>
          <router-link to="/post">投稿してみる</router-link>
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
    // 算出プロパティでstateのuserを呼び出し
    userInfo () {
      return this.$store.state.user
    },
    myPosts () {
      return this.$store.state.myQuestions
    }
  },
  methods: {
    getMyPosts () {
      this.$store.dispatch("myposts", this.userInfo.user.id)
    },
    getId (id) {
      this.$store.dispatch("posting", id)
    }
 },
 mounted: function () {
   this.getMyPosts()
 }

}
</script>

<style lang="css" scoped>
</style>
