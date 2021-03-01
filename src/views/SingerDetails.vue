<template>
  <div id="singer-details" class="fixed">
    <p>Singer Details {{ $route.params.id }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetails } from '@api/singers'
import { ERR_OK } from '@api/config'

export default {
  name: 'SingerDetails',
  computed: {
    ...mapGetters('singers', ['singer'])
  },
  methods: {
    async getDetails() {
      try {
        if (!this.singer.mid) {
          this.$router.push({
            name: 'singers'
          })
          return false
        }

        const response = await getSingerDetails(this.singer.mid)
        if (response.code === ERR_OK) {
          console.info('Test Leo - receive singer details:', response.data)
        }
      } catch (err) {
        console.error(`Request Error: ${err}`)
      }
    }
  },
  created() {
    this.getDetails()
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
