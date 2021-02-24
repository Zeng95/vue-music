<template>
  <div id="app">
    <Header />
    <Tabs />
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Header from '@c/Header'
import Tabs from '@c/Tabs'

export default {
  name: 'App',
  components: {
    Header,
    Tabs
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
