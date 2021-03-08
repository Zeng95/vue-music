<template>
  <div id="app">
    <TheHeader />
    <TheTabs />
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import TheTabs from '@l/TheTabs'
import TheHeader from '@l/TheHeader'

export default {
  name: 'App',
  components: { TheTabs, TheHeader }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
