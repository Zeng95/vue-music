<template>
  <div>Singer</div>
</template>

<script>
import { getSingerList } from '@api/singers'

export default {
  name: 'Singer',
  data() {
    return {
      singerList: []
    }
  },
  methods: {
    // 歌手列表
    async getSingers() {
      try {
        const response = await getSingerList()
        console.info('TEST Leo --- Receive Singer List:', response)
      } catch (err) {
        console.error(`Request Error: ${err}`)
      }
    }
  },
  created() {
    console.info('TEST Leo --- Trigger Created Method In The Singers')
    this.getSingers()
  }
}
</script>

<style lang="scss" scoped></style>
