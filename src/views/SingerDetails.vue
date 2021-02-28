<template>
  <div id="singer-details" class="fixed">
    <p>Singer Details {{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'SingerDetails'
}
</script>

<style lang="scss" scoped>
#singer-details {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  background-color: red;
}
</style>
