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
      <div class="singer-background-image" ref="bgImage">
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
      let translateY = Math.max(this.minTranslateY, newY)
      this.$refs.bgLayer.style.transform = `translate3d(0, ${translateY}px, 0)`
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
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight
    this.$refs.songList.$el.style.top = `${this.imageHeight}px`
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
      z-index: 7;
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
      z-index: 6;
      width: 100%;
      line-height: 40px;
      font-size: $font-size-lg;
    }

    .singer-background-image {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
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
        z-index: 5;
      }
    }
  }

  .bg-layer {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: $color-background-current;
  }
}
</style>
