<template>
  <div id="singers">
    <!-- 滚动内容 -->
    <Scroll v-if="showScroll" ref="scroll" :scrollData="groupList">
      <ListView :groupList="groupList" />
    </Scroll>
    <!-- Loading -->
    <div v-else class="loading-container">
      <Loading />
    </div>
  </div>
</template>

<script>
import { getSingerList } from '@api/singers'
import { ERR_OK } from '@api/config'
import Singer from '@a/scripts/singer'
import ListView from '@s/ListView'
import Loading from '@s/Loading'
import Scroll from '@s/Scroll'

const POPULAR_NAME = '热门'
const POPULAR_SINGERS_LENGTH = 10

export default {
  name: 'Singers',
  components: { Scroll, ListView, Loading },
  data() {
    return {
      groupList: []
    }
  },
  computed: {
    showScroll() {
      return this.groupList.length > 0
    }
  },
  methods: {
    // 歌手列表
    async getSingers() {
      try {
        const response = await getSingerList()
        if (response.code === ERR_OK) {
          console.info('TEST Leo --- Receive Singer List:', response)
          this.groupList = this.normalizeGroupList(response.data.list)
        }
      } catch (err) {
        console.error(`Request Error: ${err}`)
      }
    },
    // 整合歌手数据
    normalizeGroupList(list) {
      let map = {
        popular: {
          title: POPULAR_NAME,
          singers: []
        }
      }
      let popular = []
      let rest = []

      list.forEach((item, index) => {
        const { Fsinger_id: id, Fsinger_name: name, Fsinger_mid: mid } = item
        const singer = new Singer(id, name, mid)
        const key = item.Findex

        if (index < POPULAR_SINGERS_LENGTH) {
          map.popular.singers.push(singer)
        }

        if (!map[key]) {
          map[key] = {
            title: key.toUpperCase(),
            singers: []
          }
        }

        map[key].singers.push(singer)
      })

      Object.values(map).forEach(value => {
        if (value.title === POPULAR_NAME) {
          popular.push(value)
        }

        if (value.title.match(/[a-zA-Z]/)) {
          rest.push(value)
        }
      })

      rest.sort(this.compareAlphabetical)

      return popular.concat(rest)
    },
    // 比较字母排序
    compareAlphabetical(a, b) {
      return a['title'].localeCompare(b['title'])
    }
  },
  created() {
    console.info('TEST Leo --- Trigger Created Method In Singers Page')
    this.getSingers()
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/mixins';

#singers {
  @include fixed-top;
  overflow: hidden;

  .loading-container {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translate3d(0, -50%, 0);
  }
}
</style>
