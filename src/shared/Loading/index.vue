<template>
  <div id="loading" class="text-center">
    <img :src="imgUrl" alt="loading" class="mx-auto" width="24" height="24" />
    <p class="description mt-1">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    title: {
      type: String,
      default: 'Loading...'
    }
  },
  data() {
    return {
      imgUrl: require('./loading.gif')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

#loading {
  width: 100%;
  .description {
    line-height: 20px;
    font-size: $font-size-sm;
    color: $color-text-light;
  }
}
</style>
