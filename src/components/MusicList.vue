<template>
  <div class="music-list">
    <!-- 头部 -->
    <div class="top">
      <!-- Icon Back -->
      <div class="back" @click="goToSingers">
        <i class="icon-back block"></i>
      </div>
      <!-- Singer Name -->
      <h1 class="singer-name text-center">{{ name }}</h1>
      <!-- Singer Bg Image -->
      <div class="singer-background-image" ref="bgImageWrapper">
        <img :src="bgImage" />
        <div class="mask"></div>
      </div>
    </div>
    <!-- 黑色背景遮罩层 -->
    <div class="bg-layer" ref="bgLayer"></div>
    <!-- 歌曲列表 -->
    <SongList :songs="songs" @scroll="onScroll" ref="songList" />
  </div>
</template>

<script>
import SongList from '@s/SongList'

const RESERVED_HEIGHT = 40

export default {
  name: 'MusicList',
  components: { SongList },
  props: {
    name: {
      type: String,
      required: true
    },
    bgImage: {
      type: String,
      required: true
    },
    songs: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  watch: {
    scrollY(newY) {
      let zIndex = 0
      let height = 0
      let scale = 1
      let overflow = 'unset'

      const percent = newY / this.bgImageHeight
      const translateY = Math.max(this.minTranslateY, newY)
      this.$refs.bgLayer.style.transform = `translate3d(0, ${translateY}px, 0)`

      // 用户向上滑动
      if (newY < this.minTranslateY) {
        zIndex = 4
        height = `${RESERVED_HEIGHT}px`
        overflow = 'hidden'

        this.$refs.bgImageWrapper.style['padding-top'] = 0
      } else {
        this.$refs.bgImageWrapper.style['padding-top'] = '70%'
      }

      // 用户向下滑动
      if (newY > 0) {
        zIndex = 4
        overflow = 'hidden'
        scale += percent
      }

      this.$refs.bgImageWrapper.style['z-index'] = zIndex
      this.$refs.bgImageWrapper.style.height = height
      this.$refs.bgImageWrapper.style.overflow = overflow
      this.$refs.bgImageWrapper.style.transform = `scale(${scale})`
    }
  },
  methods: {
    // 跳转到 Singers 路由页面
    goToSingers() {
      this.$router.push({
        name: 'singers'
      })
    },
    onScroll(position) {
      this.scrollY = position.y
    }
  },
  mounted() {
    this.bgImageHeight = this.$refs.bgImageWrapper.clientHeight
    this.minTranslateY = -this.bgImageHeight + RESERVED_HEIGHT
    this.$refs.songList.$el.style.top = `${this.bgImageHeight}px`
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

.music-list {
  position: relative;
  width: 100%;
  height: 100%;
  .top {
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 6;
      color: $color-theme-yellow;
      .icon-back {
        padding: 10px;
        font-size: $font-size-xl;
      }
    }

    .singer-name {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 5;
      width: 100%;
      line-height: 40px;
      font-size: $font-size-lg;
    }

    .singer-background-image {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      transform-origin: top;
      img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
      }

      .mask {
        @extend img;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
  }

  .bg-layer {
    position: relative;
    width: 100%;
    height: 100%;
    background: $color-background-current;
    z-index: 1;
  }
}
</style>
