<template>
  <div class="following">
    <v-app>

      <v-card width="600px" class="mx-auto mt-10 mb-10">
        <!-- 表示切り替え -->
        <v-card-title>
          <v-icon class="icon-space">mdi-format-list-bulleted-square</v-icon>
          <span class="title font-weight-bold">Follow</span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-list three-line>
            <template v-for="following in followings">
              <v-list-item :key="following.id">
                <!-- アバター -->
                <v-list-item-avatar color="blue" tile>
                  <v-icon large dark>mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <!-- 名前-->
                  <v-list-item-title>
                    <a class="title font-weight-bold" @click="getDetailUserPosts(following)">{{ following.name }}</a>
                  </v-list-item-title>
                  <!-- プロフィール説明文 -->
                  <v-list-item-subtitle>
                    プロフィール説明文
                  </v-list-item-subtitle>

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
  name: 'Following',
  data () {
    return {

    }
  },
  computed: {
    followings () {
      return this.$store.state.user.followings
    }
  },
  methods: {
  },
}
</script>

<style lang="css" scoped>
</style>
