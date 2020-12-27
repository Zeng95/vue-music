<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@c/Header'

export default {
  name: 'App',
  components: { Header }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

#app {
  color: $color-theme;
}
</style>
