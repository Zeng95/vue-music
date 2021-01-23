<template>
  <div id="app">
    <Header />
    <Tabs />
    <router-view />
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
