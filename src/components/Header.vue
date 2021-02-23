<template>
  <header class="relative flex justify-center items-center">
    <div class="icon bg-center bg-no-repeat"></div>
    <h1 class="title">Chicken Music</h1>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';
@import '@a/styles/scss/mixin';

header {
  width: 100%;
  height: 44px;
  color: #ffcd32;
  font-size: 0;
  .icon {
    width: 30px;
    height: 32px;
    margin-right: 9px;
    background-size: 100%;
    @include bg-image('../assets/images/logo');
  }

  .title {
    font-size: $font-size-lg;
  }
}
</style>
