<template>
  <div id="singer-details">
    <MusicList
      v-if="showMusicList"
      :name="singer.name"
      :bgImage="singer.avatar"
      :songs="songs"
    />
    <!-- Loading -->
    <div v-else class="loading-container">
      <Loading />
    </div>
  </div>
</template>

<script>
import { ERR_OK } from '@api/config'
import { mapGetters } from 'vuex'
import { getSingerDetails } from '@api/singers'
import { createSong } from '@a/scripts/song'
import Loading from '@s/Loading/Loading'
import MusicList from '@c/MusicList'

export default {
  name: 'SingerDetails',
  components: { MusicList, Loading },
  computed: {
    ...mapGetters('singers', ['singer']),
    showMusicList() {
      return this.songs.length > 0
    }
  },
  data() {
    return {
      songs: []
    }
  },
  methods: {
    async fetchDetails() {
      try {
        if (!this.singer.mid) {
          this.$router.push({ name: 'singers' })
          return false
        }

        const response = await getSingerDetails(this.singer.mid)
        if (response.code === ERR_OK) {
          console.info('Test Leo - receive singer details:', response.data.list)
          this.songs = this.normalizeSongList(response.data.list)
        }
      } catch (err) {
        console.error(`Request Error: ${err}`)
      }
    },
    // 整合歌曲数据
    normalizeSongList(list) {
      let result = []

      list.forEach(item => {
        const { songid, albummid } = item.musicData
        if (songid && albummid) {
          result.push(createSong(item.musicData))
        }
      })

      return result
    }
  },
  created() {
    this.fetchDetails()
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

#singer-details {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  background-color: $color-background-current;
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
