<template>
  <v-text-field prepend-icon="mdi-email" label="メールアドレス" v-model="data.email" />
</template>

<script>
export default {
  data: () => ({
    data: {
      name: '',
      email: '',
      password: ''
    }
  })
}
</script>

<style lang="scss" scoped>

</style>
