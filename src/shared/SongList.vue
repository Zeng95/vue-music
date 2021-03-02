<template>
  <Scroll class="song-list" :scrollData="songList">
    <ul>
      <li
        class="song flex flex-col justify-center"
        v-for="song in songList"
        :key="song.id"
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
    songList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    getDescription(song) {
      return `${song.singer}·${song.albumName}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

.song-list {
  overflow: hidden;
  background: $color-background-current;
  > ul {
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
