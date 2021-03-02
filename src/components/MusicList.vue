<template>
  <div id="music-list">
    <!-- 顶部 -->
    <div class="top">
      <!-- Left Arrow -->
      <div class="back absolute" @click="goToSingers">
        <i class="icon-back block"></i>
      </div>
      <!-- Singer Name -->
      <h1 class="singer-name text-center">{{ name }}</h1>
      <!-- Singer Image -->
      <div class="singer-background-image absolute">
        <img ref="bgImage" :src="bgImage" class="w-full" @load="onImageLoad" />
        <div class="overlay absolute"></div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div
      v-show="isImageLoaded"
      class="song-list-wrapper absolute"
      ref="songListWrapper"
    >
      <SongList :songList="songs" />
    </div>
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
      default: '',
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
      isImageLoaded: false
    }
  },
  methods: {
    // 跳转到 Singers 路由页面
    goToSingers() {
      this.$router.push({
        name: 'singers'
      })
    },
    onImageLoad() {
      this.isImageLoaded = true
      this.$refs.songListWrapper.style.top = `calc(${this.$refs.bgImage.clientHeight}px - 17%)`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

#music-list {
  .top {
    .back {
      top: 0;
      left: 6px;
      z-index: 50;
      color: $color-theme-yellow;
      .icon-back {
        padding: 10px;
        font-size: $font-size-xl;
      }
    }

    .singer-name {
      line-height: 40px;
      font-size: $font-size-lg;
    }

    .singer-background-image {
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      z-index: -1;
      .overlay {
        @extend .singer-background-image;
        bottom: 0;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
        z-index: 5;
      }
    }
  }

  .song-list-wrapper {
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
