<template>
  <div id="recommendations">
    <!-- 滚动内容 -->
    <Scroll v-if="showScroll" ref="scroll">
      <div class="scroll-content">
        <Carousel>
          <li v-for="item in recommendations" :key="item.id">
            <a class="block">
              <img :src="item.picUrl" alt="banner" @load="onImageLoad" />
            </a>
          </li>
        </Carousel>
        <!-- 热门歌单推荐 -->
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
                <img v-lazy="item.imgurl" class="h-full" />
              </div>
              <!-- 歌曲信息 -->
              <div class="info flex-1">
                <h2 class="name">{{ item.creator.name }}</h2>
                <p class="description truncate">{{ item.dissname }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <!-- Loading -->
    <div v-else class="loading-container">
      <Loading />
    </div>
  </div>
</template>

<script>
import { ERR_OK } from '@api/config'
import { getRecommendationList, getPlayList } from '@api/recommendations'
import Scroll from '@s/Scroll'
import Loading from '@s/Loading'
import Carousel from '@s/Carousel'

export default {
  name: 'Recommendations',
  components: { Scroll, Carousel, Loading },
  computed: {
    showScroll() {
      return this.recommendations.length > 0 && this.playList.length > 0
    }
  },
  data() {
    return {
      playList: [],
      recommendations: [],
      imageIsLoaded: false
    }
  },
  methods: {
    // 轮播图
    async fetchRecommendationList() {
      try {
        // 异步请求
        const response = await getRecommendationList()
        if (response.code === ERR_OK) {
          console.info('Test Leo - receive sliderlist:', response.data)
          this.recommendations = response.data.slider
        }
      } catch (err) {
        console.error('Request error:', err)
      }
    },
    // 歌单列表
    async fetchPlayList() {
      try {
        // 异步请求
        const { data: response } = await getPlayList()
        if (response.code === ERR_OK) {
          console.info('Test Leo - receive playlist:', response.data)
          this.playList = response.data.list
        }
      } catch (err) {
        console.error('Request error:', err)
      }
    },
    // Detect when the images are loaded
    onImageLoad() {
      if (!this.imageIsLoaded) {
        console.info('Test Leo - the recommendation list images are loaded')
        this.imageIsLoaded = true
        this.$refs.scroll.refresh()
      }
    }
  },
  created() {
    this.fetchRecommendationList()
    this.fetchPlayList()
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';
@import '@a/styles/scss/mixins';

#recommendations {
  @include fixed-top;
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
        width: 60px;
        height: 60px;
        margin-right: 20px;
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

  .loading-container {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 100%;
    transform: translate3d(0, -50%, 0);
  }
}
</style>
