<template>
  <Scroll
    class="song-list"
    :probe-type="probeType"
    :listen-scroll="listenScroll"
    @scroll="onScroll"
  >
    <ul class="songs">
      <li
        class="song flex flex-col justify-center"
        v-for="song in songs"
        :key="song.songId"
      >
        <h2 class="name truncate">{{ song.songName }}</h2>
        <p class="description truncate">{{ getDescription(song) }}</p>
      </li>
    </ul>
  </Scroll>
</template>

<script>
import Scroll from './Scroll'

export default {
  name: 'SongList',
  components: { Scroll },
  props: {
    songs: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    getDescription(song) {
      return `${song.singer}·${song.albumName}`
    },
    onScroll(position) {
      this.$emit('scroll', position)
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

.song-list {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  background: $color-background-current;
  overflow: unset;
  height: auto;
  .songs {
    padding: 20px 0;
  }

  .song {
    padding: 0 30px;
    height: 64px;
    line-height: 20px;
    font-size: $font-size-md;
    .description {
      margin-top: 4px;
      color: $color-text-dark;
    }
  }
}
</style>
