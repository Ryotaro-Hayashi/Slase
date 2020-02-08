<template>
<div class="user">
  <v-app>
    <v-card width="800px" class="mx-auto mt-10">
      <ul>
        <li>{{ detailUserInfo.name }}</li>
        <v-file-input label="プロフィール画像を選択" @change="getFileName"></v-file-input>
        <v-btn>プロフィール画像を決定</v-btn>
        <!-- ファイル名を表示 -->
        <li>{{ fileName }}</li>
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
  data: () => ({
    // ファイル名
    fileName: ''
  }),
  computed: {
    // ログイン中のユーザーの投稿一覧表示
    myPosts () {
      return this.$store.state.myQuestions
    },
    detailUserInfo () {
      return this.$store.getters.detailUserInfo
    }
  },
  methods: {
    // 詳細表示する投稿情報を更新
    getId (id) {
      this.$store.dispatch("posting", id)
    },
    // ファイル名を取得
    getFileName (file) {
      this.fileName = file.name
    }
 }

}
</script>

<style lang="css" scoped>
</style>
