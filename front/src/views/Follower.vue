<template>
  <div class="Follower">
    <v-app>

      <v-card width="95%" max-width="600px" class="mx-auto mt-10 mb-10">
        <!-- 表示切り替え -->
        <v-card-title>
          <v-icon class="icon-space">mdi-format-list-bulleted-square</v-icon>
          <span class="title font-weight-bold">フォロワー</span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-list three-line>
            <template v-for="follower in followers">
              <v-list-item :key="follower.id">
                <!-- アバター -->
                <v-list-item-avatar color="blue" tile>
                  <v-icon large dark>mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <!-- 名前-->
                  <v-list-item-title>
                    <router-link to="/detail/user" class="title font-weight-bold" @click.native="getDetailUser(follower.id)">{{ follower.name }}</router-link>
                  </v-list-item-title>
                  <!-- プロフィール説明文 -->
                  <v-list-item-subtitle>
                    {{ follower.introduce }}
                  </v-list-item-subtitle>

                  <v-divider></v-divider>

                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>

          <v-card-actions v-if="!isNotEmpty(followers)">
            まだフォロワーがいません。
          </v-card-actions>

        </v-card-text>

      </v-card>

    </v-app>
  </div>
</template>

<script>
export default {
  name: 'Follower',
  data () {
    return {

    }
  },
  computed: {
    followers () {
      return this.$store.state.user.followers
    },
    // 配列が空でなければ、trueを返す
    isNotEmpty: function () {
      return function (followers) {
        // JavaScriptでは条件文で空文字を評価できる
        // 配列の1つ目の要素を評価する
        if (followers[0]) {
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
