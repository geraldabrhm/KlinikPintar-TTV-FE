<script lang="ts">
  import Header from './layout/Header.vue'

  export default {
    name: 'App',
    components: {
      Header,
    },
  }

</script>

<template>
  <Header />
  <router-view></router-view>
</template>

<style scoped>
</style>
