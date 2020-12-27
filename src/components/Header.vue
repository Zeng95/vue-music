<template>
  <header class="relative">
    <div class="content flex justify-center">
      <div class="icon"></div>
      <h1 class="title">炸鸡音乐</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

header {
  height: 44px;
  color: #ffcd32;
  font-size: 0;

  .title {
    font-size: $font-size-large;
  }
}
</style>
