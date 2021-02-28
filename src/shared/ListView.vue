<template>
  <Scroll id="list-view" :scrollData="groupList" ref="scroll">
    <!-- List 歌手列表 -->
    <div class="list-group">
      <ol>
        <li
          v-for="item in groupList"
          :key="`id-${item.title}`"
          class="list-group-item"
          ref="listGroupItem"
        >
          <!-- 标题 -->
          <h2 class="index-anchor">{{ item.title }}</h2>
          <!-- 歌手 -->
          <ul class="singers">
            <li
              v-for="singer in item.singers"
              :key="singer.id"
              class="singer flex items-center"
              @click="onClickSinger(singer)"
            >
              <div class="avatar">
                <img
                  v-lazy="singer.avatar"
                  alt="singer avatar"
                  class="rounded-full h-full"
                />
              </div>
              <span class="name">{{ singer.name }}</span>
            </li>
          </ul>
        </li>
      </ol>
    </div>
    <!-- IndexBar 索引栏 -->
    <div
      class="index-bar absolute"
      @touchstart="onIndexBarTouchStart"
      @touchmove="onIndexBarTouchMove"
    >
      <ol>
        <li
          v-for="(item, index) in indexList"
          :key="item"
          :data-index="index"
          class="index"
          :class="{ active: currentIndex === index }"
          ref="indexAnchor"
        >
          {{ item }}
        </li>
      </ol>
    </div>
  </Scroll>
</template>

<script>
import { getData } from '@a/scripts/dom'
import Scroll from '@s/Scroll'

export default {
  name: 'ListView',
  components: { Scroll },
  props: {
    groupList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    indexList() {
      // Returns the array of results
      let result = this.groupList.map(item => {
        // Returns the part of the string from start, with the given length
        return item.title.substr(0, 1)
      })

      return result
    },
    showScroll() {
      return this.groupList.length > 0
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    onClickSinger(singer) {
      // ListView 是一个基础组件，所以不应该包含任何业务逻辑相关的代码
      console.info('Test Leo - select a singer')
      this.$emit('select', singer)
    },
    onIndexBarTouchStart(event) {
      // 手指开始触摸事件
      console.info('Test Leo - touch start event', event)

      const anchorIndex = parseInt(getData(event.target, 'index'))

      this.touch.startY = event.targetTouches[0].pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onIndexBarTouchMove(event) {
      // 手指开始移动事件
      console.info('Test Leo - touch move event', event)

      this.touch.moveY = event.targetTouches[0].pageY
      let indexAnchorHeight = this.$refs.indexAnchor[0].offsetHeight
      let moveY = 0
      let anchorIndex

      // 判断手指垂直移动方向
      if (this.touch.startY - this.touch.moveY < 0) {
        // 手指向下移动
        moveY = this.touch.moveY - this.touch.startY
        anchorIndex =
          parseInt(this.touch.anchorIndex) +
          Math.ceil(moveY / indexAnchorHeight)
      } else {
        // 手指向上移动
        moveY = this.touch.startY - this.touch.moveY
        anchorIndex =
          parseInt(this.touch.anchorIndex) -
          Math.ceil(moveY / indexAnchorHeight)
      }

      this._scrollTo(anchorIndex)
    },
    // 函数名前加下划线表示“私有函数”
    // 加下划线，还能有效防止重名
    _scrollTo(index) {
      const scroll = this.$refs.scroll
      const listGroupItems = this.$refs.listGroupItem

      this.currentIndex = index

      console.info('Test Leo - get list group items', listGroupItems)
      console.info('Test Leo - get anchor index', index)

      scroll.scrollToElement(listGroupItems[index], 0)
    }
  },
  created() {
    // data 或者 props 里的数据都会被添加 getter and setter
    // 因为并不需要监听 touch 的变化，所以提前在 created method 中创建，并且可以在整个组件中使用
    this.touch = {}
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

#list-view {
  position: relative;
  overflow: hidden;
  background: $color-background-current;
  .list-group-item {
    padding-bottom: 30px;
    .index-anchor {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-sm;
      color: $color-text-light;
      background: $color-highlight-background;
    }

    .singer {
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
      }

      .name {
        margin-left: 20px;
        color: $color-text-light;
        font-size: $font-size-md;
      }
    }
  }

  .index-bar {
    top: 50%;
    right: 0;
    transform: translate3d(0, -50%, 0);
    width: 20px;
    border-radius: 10px;
    text-align: center;
    background: $color-background-dark;
    font-family: Helvetica;
    z-index: 100;
    .index {
      padding: 3px 4px;
      font-size: $font-size-sm;
      color: $color-text-light;
      &.active {
        color: $color-theme-yellow;
      }
    }
  }
}
</style>
