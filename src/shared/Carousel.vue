<template>
  <!-- 轮播图 -->
  <div ref="carousel" class="carousel relative overflow-hidden">
    <!-- 图片列表 -->
    <ul
      ref="carouselList"
      class="carousel-track flex h-full"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <slot></slot>
    </ul>
    <!-- 指示器 -->
    <ol class="indicators flex justify-center absolute w-full">
      <li
        v-for="(item, index) in indicators"
        :key="item"
        class="indicator"
        :class="{ active: currentIndex === index }"
      />
    </ol>
  </div>
</template>

<script>
import { addClass } from '@a/scripts/dom'

export default {
  name: 'Carousel',
  props: {
    tag: {
      type: String,
      default: 'ul'
    },
    interval: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      indicators: [],
      timer: null,
      currentIndex: 0,

      carousel: null,
      carouselList: null,
      carouselItems: null,
      carouselWidth: 0,

      touchStartX: 0,
      touchMoveX: 0,
      moveX: 0,

      flag: true
    }
  },
  watch: {
    currentIndex(newValue) {
      if (newValue > this.carouselItems.length - 1) {
        this.currentIndex = 0
      } else if (newValue < 0) {
        this.currentIndex = this.carouselItems.length - 1
      }
    }
  },
  methods: {
    onTouchStart(event) {
      // 手指开始触摸事件
      console.info('TEST Leo --- touch start event', event)
      if (this.flag) {
        this.touchStartX = event.targetTouches[0].clientX
      }
    },
    onTouchMove(event) {
      // 手指开始移动
      console.info('TEST Leo --- touch move event', event)
      if (this.flag) {
        this.touchMoveX = event.targetTouches[0].clientX
        this.moveX =
          this.currentIndex * this.carouselWidth +
          (this.touchStartX - this.touchMoveX)

        this.carouselList.style.transform = `translate3d(-${this.moveX}px, 0, 0)`
      }
    },
    onTouchEnd(event) {
      // 手指结束触摸
      console.info('TEST Leo --- touch end event', event)
      if (this.flag) {
        // this.flag = false
      }
    },
    next() {
      this.currentIndex += 1

      this.carouselList.style.transition = 'all .4s' // 切换下一张图片
      this.carouselList.style.transform = `translateX(${this.translateX}px)`
    },
    prev() {
      this.currentIndex -= 1
    },
    playCarousel() {
      this.timer = setInterval(this.next, this.interval)
    },
    setCarouselWidth() {
      this.carousel = this.$refs.carousel
      this.carouselList = this.$refs.carouselList
      this.carouselItems = this.carouselList.children
      this.carouselWidth = this.carousel.clientWidth // Get the inner width of carousel in pixels

      let width = 0

      this.carouselItems.forEach(item => {
        addClass(item, ['carousel-item'])

        item.style.width = `${this.carouselWidth}px`
        width += this.carouselWidth
      })

      this.carouselList.style.width = `${width}px`
    },
    initIndicators() {
      this.indicators = new Array(this.carouselItems.length)
    }
  },
  mounted() {
    this.setCarouselWidth()
    this.initIndicators()

    // if (this.autoPlay) {
    //   this.playCarousel()
    // }
  },
  destroyed() {
    console.info('TEST Leo --- Destroyed the component')
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

::v-deep.carousel {
  cursor: grab;
  .carousel-item {
    flex-shrink: 0;
    height: 100%;
  }

  .indicators {
    bottom: 12px;
    .indicator {
      width: 8px;
      height: 8px;
      margin: 0 4px;
      border-radius: 50%;
      background-color: $color-text-light;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-lighter;
      }
    }
  }
}
</style>
