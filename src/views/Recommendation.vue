<template>
  <div>Recommendation</div>
</template>

<script>
import { getRecommendation } from '@api/recommendation'
import { ERR_OK } from '@api/config'

export default {
  name: 'Recommendation',
  data() {
    return {}
  },
  methods: {
    async _getRecommendation() {
      try {
        const response = await getRecommendation()
        if (response.code === ERR_OK) {
          console.info('TEST Leo --- Receive Data', response)
        }
      } catch (err) {
        console.error(err)
      }
    }
  },
  created() {
    this._getRecommendation()
  }
}
</script>

<style lang="scss" scoped></style>
