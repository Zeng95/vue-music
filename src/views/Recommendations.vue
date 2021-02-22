<template>
  <div id="recommendations">
    <!-- 轮播图 -->
    <Carousel v-if="recommendations.length > 0">
      <li v-for="item in recommendations" :key="item.id">
        <!-- :href="item.linkUrl" -->
        <a class="block">
          <img :src="item.picUrl" alt="banner" />
        </a>
      </li>
    </Carousel>
    <!-- 歌单推荐 -->
    <div class="recommendation-list">
      <h1 class="title text-center">热门歌单推荐</h1>
      <ul class="playlist">
        <li
          v-for="item in playList"
          :key="item.dissid"
          class="song flex items-center"
        >
          <!-- 歌曲封面 -->
          <div class="icon">
            <img v-lazy="item.imgurl" alt="icon" width="60" height="60" />
          </div>
          <!-- 歌单信息 -->
          <div class="info flex-1">
            <h2 class="name">{{ item.creator.name }}</h2>
            <p class="description truncate">{{ item.dissname }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRecommendationList, getPlayList } from '@api/recommendations'
import { ERR_OK } from '@api/config'
import Carousel from '@s/Carousel'

export default {
  name: 'Recommendations',
  components: { Carousel },
  data() {
    return {
      recommendations: [],
      playList: []
    }
  },
  methods: {
    async _getRecommendations() {
      try {
        const response = await getRecommendationList()
        if (response.code === ERR_OK) {
          console.info('TEST Leo --- Receive Recommendation List: ', response)
          this.recommendations = response.data.slider
        }
      } catch (err) {
        console.error(`Request Error: ${err}`)
      }
    },
    async _getPlayList() {
      try {
        const { data: response } = await getPlayList()
        if (response.code === ERR_OK) {
          console.info('TEST Leo --- Receive Play List: ', response)
          this.playList = response.data.list
        }
      } catch (err) {
        console.error(`Request Error: ${err}`)
      }
    }
  },
  created() {
    console.info('TEST Leo --- Trigger Created Method')
    this._getRecommendations()
    this._getPlayList()
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

    .song {
      padding: 0 20px 20px;
      .icon {
        flex: 0 0 80px;
        width: 80px;
        padding-right: 20px;
      }

      .info {
        font-size: 14px;
        line-height: 20px;
      }

      .name {
        margin-bottom: 10px;
      }

      .description {
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
