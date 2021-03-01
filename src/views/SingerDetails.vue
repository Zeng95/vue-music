<template>
  <div id="singer-details" class="fixed">
    <p>Singer Details {{ $route.params.id }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SingerDetails',
  computed: {
    ...mapGetters('singers', ['singer'])
  },
  methods: {},
  created() {
    console.info(
      'Test Leo - trigger created method in SingerDetails page',
      this.singer
    )
  }
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
