<template>
  <div class="following">
    <v-app>

      <v-card width="95%" max-width="600px" class="mx-auto mt-10 mb-10">
        <!-- 表示切り替え -->
        <v-card-title>
          <v-icon class="icon-space">mdi-format-list-bulleted-square</v-icon>
          <span class="title font-weight-bold">フォロー</span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-list three-line>
            <template v-for="following in followings">
              <v-list-item :key="following.id">
                <!-- アバター -->
                <v-list-item-avatar tile>
                  <img :src="following.avatar.url">
                </v-list-item-avatar>

                <v-list-item-content>
                  <!-- 名前-->
                  <v-list-item-title>
                    <router-link to="/detail/user" class="title font-weight-bold" @click.native="getDetailUser(following.id)">{{ following.name }}</router-link>
                  </v-list-item-title>
                  <!-- プロフィール説明文 -->
                  <v-list-item-subtitle>
                    {{ following.introduce }}
                  </v-list-item-subtitle>

                  <v-divider></v-divider>

                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>

          <v-card-actions v-if="!isNotEmpty(followings)">
            まだフォローがいません。
          </v-card-actions>

        </v-card-text>

      </v-card>

    </v-app>
  </div>
</template>

<script>
export default {
  name: 'Following',
  data () {
    return {

    }
  },
  computed: {
    followings () {
      return this.$store.state.user.followings
    },
    // 配列が空でなければ、trueを返す
    isNotEmpty: function () {
      return function (followings) {
        // JavaScriptでは条件文で空文字を評価できる
        // 配列の1つ目の要素を評価する
        if (followings[0]) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    getDetailUser (id) {
      this.$store.dispatch("user/getDetailUser", id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
