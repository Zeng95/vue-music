<template>
  <div id="singers">
    <ListView :group-list="groupList" @select="showSingerDetails" />
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
import ListView from '@s/ListView'

const POPULAR_NAME = '热门'
const POPULAR_SINGERS_LENGTH = 10

export default {
  name: 'Singers',
  components: { ListView },
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
    async getSingers() {
      try {
        const response = await getSingerList()
        if (response.code === ERR_OK) {
          console.info('Test Leo - receive singer list:', response)
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
    showSingerDetails(singer) {
      this.setSinger(singer)
      this.$router.push({
        name: 'singerDetails',
        params: { id: singer.id }
      })
    }
  },
  created() {
    console.info('Test Leo - trigger created method in Singers page')
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

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }

  .slide-enter,
  .slide-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
