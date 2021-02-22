<template>
  <div id="app">
    <Header />
    <Tabs />
    <keep-alive>
      <router-view />
    </keep-alive>
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
