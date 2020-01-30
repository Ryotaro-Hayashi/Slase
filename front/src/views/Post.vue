<template>
  <div class="post">
    <h1 class="center">Post</h1>

    <v-app>
      <v-card width="1200px" class="mx-auto">

        <v-form>
          <v-text-field label="タイトル"></v-text-field>
          <v-text-field label="本文"></v-text-field>
          <v-card-actions class="mt-5">
            <v-btn class="info ml-auto">投稿</v-btn>
          </v-card-actions>
        </v-form>

      </v-card>
    </v-app>
  </div>


</template>

<script>

export default {
  name: 'Post'
}
</script>

<style scoped>

</style>
