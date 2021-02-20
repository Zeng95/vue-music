<template>
  <!-- 轮播图 -->
  <div class="carousel relative overflow-hidden" ref="carousel">
    <!-- 图片列表 -->
    <transition-group
      :tag="tag"
      class="track flex"
      name="carousel-list"
      ref="carouselList"
    >
      <slot></slot>
    </transition-group>
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
    autoplay: {
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
      currentIndex: 0
    }
  },
  methods: {
    initCarousel() {
      this.carouselItems = this.$refs.carouselList.children
      this.carouselItems.forEach(item => {
        addClass(item.elm, ['item'])
      })
    },
    initIndicators() {
      this.indicators = new Array(this.carouselItems.length)
    }
  },
  mounted() {
    this.initCarousel()
    this.initIndicators()
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

::v-deep.carousel {
  .item {
    flex-shrink: 0;
    width: 100%;
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
