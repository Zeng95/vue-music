<template>
  <div id="singers">
    <!-- 滚动内容 -->
    <ListView
      v-if="showGroupList"
      :group-list="groupList"
      @select="goToSingerDetails"
    />
    <!-- Loading -->
    <div v-else class="loading-container">
      <Loading />
    </div>
    <!-- 路由子页面 -->
    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getSingerList } from '@api/singers'
import { ERR_OK } from '@api/config'
import Singer from '@a/scripts/singer'
import Loading from '@s/Loading/Loading'
import ListView from '@s/ListView'

const POPULAR_NAME = '热门'
const POPULAR_SINGERS_LENGTH = 10

export default {
  name: 'Singers',
  components: { ListView, Loading },
  computed: {
    showGroupList() {
      return this.groupList.length > 0
    }
  },
  data() {
    return {
      groupList: []
    }
  },
  methods: {
    ...mapMutations('singers', {
      setSinger: 'SET_SINGER'
    }),
    // 歌手列表
    async fetchSingerList() {
      try {
        const response = await getSingerList()
        if (response.code === ERR_OK) {
          console.info('Test Leo - receive singerlist:', response)
          this.groupList = this.normalizeSingerList(response.data.list)
        }
      } catch (err) {
        console.error(`Request Error: ${err}`)
      }
    },
    // 整合歌手数据
    normalizeSingerList(list) {
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
    },
    // 跳转到 SingerDetails 路由页面
    goToSingerDetails(singer) {
      this.setSinger(singer)
      this.$router.push({
        name: 'singerDetails',
        params: { id: singer.id }
      })
    }
  },
  created() {
    this.fetchSingerList()
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/mixins';

#singers {
  @include fixed-top;
  .loading-container {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 100%;
    transform: translate3d(0, -50%, 0);
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
