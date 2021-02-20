<template>
  <div id="recommendations">
    <Carousel v-if="recommendations.length > 0">
      <li v-for="item in recommendations" :key="item.id">
        <a class="block" :href="item.linkUrl">
          <img :src="item.picUrl" />
        </a>
      </li>
    </Carousel>
    <div class="recommendation-list">
      <h1 class="title text-center">热门歌单推荐</h1>
    </div>
  </div>
</template>

<script>
import { getRecommendations } from '@api/recommendations'
import { ERR_OK } from '@api/config'
import Carousel from '@s/Carousel'

export default {
  name: 'Recommendations',
  components: { Carousel },
  data() {
    return {
      recommendations: []
    }
  },
  methods: {
    async _getRecommendations() {
      try {
        const response = await getRecommendations()
        if (response.code === ERR_OK) {
          console.info('TEST Leo --- Receive Data', response)
          this.recommendations = response.data.slider
        }
      } catch (err) {
        console.error(err)
      }
    }
  },
  created() {
    console.info('TEST Leo --- Trigger Created Method')
    this._getRecommendations()
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

#recommendations {
  .recommendation-list {
    .title {
      width: 100%;
      height: 65px;
      line-height: 65px;
      font-size: $font-size-md;
      color: $color-theme-yellow;
    }
  }
}
</style>
