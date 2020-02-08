<template>
<div class="user">
  <v-app>
    <v-card width="800px" class="mx-auto mt-10">
      <ul>
        <li>{{ detailUserInfo.name }}</li>
        <v-file-input label="プロフィール画像を選択" v-on:change="onFileChange"></v-file-input>
        <v-btn @click="setAvatar">プロフィール画像を決定</v-btn>
        <img v-show="uploadedImage" :src="uploadedImage" />
        <input type="file" v-on:change="onFileChange">
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
    uploadedImage: ''
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
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    // アップロードした画像を表示
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
 }

}
</script>

<style lang="css" scoped>
</style>
